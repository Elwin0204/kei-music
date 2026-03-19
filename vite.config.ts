import { ConfigEnv, defineConfig, loadEnv, UserConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import progress from 'vite-plugin-progress'
import path from 'path'

export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd());
  const buildDir = env.VITE_APP_BUILD_DIR || '/';
  return {
    base: buildDir,
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    },
    plugins: [
      react(),
      tailwindcss(),
      progress()
    ],
    build: {
      rollupOptions: {
        output: {
          // 拆分入口與動態引入的 chunk
          entryFileNames: `assets/[name].[hash].js`,
          chunkFileNames: `assets/[name].[hash].js`,
          // 靜態資源按類型分類
          assetFileNames: (assetInfo) => {
            if (assetInfo.name?.endsWith('.css')) {
              return 'assets/[name].[hash].[ext]'
            }
            if (/\.(png|jpe?g|gif|svg|webp)$/i.test(assetInfo.name || '')) {
              return 'assets/img/[name].[hash].[ext]'
            }
            if (/\.(mp3|wav|ogg|flac)$/i.test(assetInfo.name || '')) {
              return 'assets/media/[name].[hash].[ext]'
            }
            if (/\.(woff2?|ttf|otf)$/i.test(assetInfo.name || '')) {
              return 'assets/fonts/[name].[hash].[ext]'
            }
            return 'assets/other/[name].[hash].[ext]'
          }
        }
      },
      // 啟用 brotli 壓縮（生產環境自動生成 .br 文件）
      sourcemap: false,
      reportCompressedSize: true
    }
  }
})