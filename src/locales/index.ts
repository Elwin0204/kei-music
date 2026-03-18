// src/locales/index.ts

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// --- 1. 导入所有语言资源文件 (.json) ---
import zhCNJson from './lang/zh-CN.json'
import enUSJson from './lang/en-US.json'
import jaJPJson from './lang/ja-JP.json'

// 为了更好的类型提示，我们可以定义一个类型映射
type LanguageResources = {
  'zh-CN': { translation: typeof zhCNJson }
  'en-US': { translation: typeof enUSJson }
  'ja-JP': { translation: typeof jaJPJson }
}

// 将导入的 JSON 对象嵌套在 'translation' 键下
const resources: LanguageResources = {
  'zh-CN': { translation: zhCNJson },
  'en-US': { translation: enUSJson },
  'ja-JP': { translation: jaJPJson }
}

// --- 2. 初始化 i18next ---
i18n
  .use(LanguageDetector) // 启用语言检测插件
  .use(initReactI18next) // 将 i18next 与 React 绑定
  .init({
    resources, // 加载的语言资源
    fallbackLng: 'zh-CN', // 如果检测不到语言或检测到的语言不被支持，则回退到 'zh-CN'
    supportedLngs: ['zh', 'zh-CN', 'en', 'en-US', 'ja', 'ja-JP'], // 添加 'zh' 和 'ja' 作为变体
    nonExplicitSupportedLngs: true, // 允许 'zh' 等变体匹配到 'zh-CN'
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'], // 缓存到 localStorage
      lookupLocalStorage: 'kei-lng', // 自定义 localStorage 键名
      convertDetectedLanguage: (lng: string) => {
        // 将常见的变体转换为标准格式
        if (lng.startsWith('zh')) {
          return 'zh-CN'
        }
        if (lng.startsWith('ja')) {
          return 'ja-JP'
        }
        // 对于 en-US, en 等，如果 supportedLngs 包含 'en'，则 nonExplicitSupportedLngs 会处理
        // 其他未知语言返回原值，最终会被 fallbackLng 处理
        return lng
      }
    },
    interpolation: {
      escapeValue: false // React 已经默认转义
    },
    // Configuration to handle missing translations
    returnEmptyString: false,
    returnNull: false
  })
  .catch((error) => {
    console.error('Failed to initialize i18n:', error)
  })

// --- 3. 导出相关内容 ---
export { i18n }
export type { LanguageResources }
export const SUPPORTED_LANGUAGES = Object.keys(resources) as (keyof LanguageResources)[]
export type SupportedLanguage = keyof LanguageResources

// 用于类型守卫，确保字符串是支持的语言
export const isSupportedLanguage = (lng: string): lng is Language => {
  return ['zh-CN', 'en-US', 'ja-JP'].includes(lng);
};