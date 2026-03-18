declare global {
  interface AppSettings {
    apiBaseUrl: string;
  }

  // 定义全局使用的主题类型
  export type Theme = 'light' | 'dark';

  // 定义全局使用的语言类型 - 使用完整的 locale codes
  export type Language = 'zh-CN' | 'en-US' | 'ja-JP';
}

export {};