// src/store/app.ts
import { i18n, isSupportedLanguage } from '@/locales'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface AppState {
  theme: Theme
  language: Language // 类型现在是 'zh-CN' | 'en-US' | 'ja-JP'
  setTheme: (theme: Theme) => void
  setLanguage: (language: Language) => void
  // 移除了 _applyThemeToDOM 方法
}

export const useApp = create<AppState>()(
  persist(
    (set) => ({
      theme: 'light',
      language: 'zh-CN',
      setTheme: (theme) => set({ theme }),
      setLanguage: (language) => set({ language }),
      // 移除了 _applyThemeToDOM 的实现
    }),
    {
      name: 'kei-preferences',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// let i18nInitialized = false;

// 在 i18next 初始化完成后，将检测到的语言同步到 store
i18n.on('initialized', () => {
  console.log("[Store Sync] i18n initialized, syncing initial language.");
  // i18nInitialized = true;
  const detectedLng = i18n.language as Language; // i18n.language 应该已经是经过处理的有效语言码
  console.log(`[Store Sync] Initial detected language from i18n: ${detectedLng}`);

  if (isSupportedLanguage(detectedLng)) {
    const currentStoreState = useApp.getState();
    if (currentStoreState.language !== detectedLng) {
        console.log(`[Store Sync] Setting store language to match i18n: ${detectedLng}`);
        useApp.getState().setLanguage(detectedLng);
    } else {
        console.log(`[Store Sync] Store language already matches i18n: ${detectedLng}`);
    }
  } else {
    console.warn(`[Store Sync] Initial detected language from i18n is unsupported: ${detectedLng}.`);
    // 如果初始化时检测到不支持的语言，可以将 store 的语言同步回 i18n (使用 fallback)
    // 这种情况理论上不应该发生，因为我们设置了 supportedLngs
    // 但如果发生了，可能需要手动触发一次 changeLanguage 到 store 的语言
    // i18n.changeLanguage(currentStoreState.language);
  }
});