import React, { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

// 定义上下文类型 - 同时包含语言和主题
interface AppContextType {
  // 语言相关
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, options?: any) => string; // 暴露翻译函数 t
  i18nInstance: any; // 暴露 i18n 实例 (如果需要更高级的操作)

  // 主题相关
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

// 创建 Context
const AppContext = createContext<AppContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // --- 语言逻辑 ---
  const { i18n, t } = useTranslation();

  const setLanguage = (lng: Language) => {
    i18n.changeLanguage(lng).catch(error => {
      console.error("Failed to change language:", error);
    });
  };

  const currentLanguage = i18n.language as Language;

  // --- 主题逻辑 ---
  // 从 localStorage 获取初始主题，如果不存在则根据系统偏好设置
  const getInitialTheme = (): Theme => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme) {
      return savedTheme;
    }
    // 如果 localStorage 中没有，尝试根据系统偏好
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  };

  const [theme, setThemeState] = useState<Theme>(getInitialTheme());

  // 应用主题到 body 标签
  useEffect(() => {
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(theme);
    localStorage.setItem('theme', theme); // 持久化到 localStorage
  }, [theme]);

  // 切换主题的函数
  const toggleTheme = () => {
    setThemeState(prev => prev === 'light' ? 'dark' : 'light');
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  return (
    // 将语言和主题的所有状态和方法都提供给子组件
    <AppContext.Provider 
      value={{ 
        language: currentLanguage, 
        setLanguage, 
        t, 
        i18nInstance: i18n,
        theme, 
        setTheme, 
        toggleTheme 
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// 自定义 Hook 用于消费 Context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within a AppProvider');
  }
  return context;
};