/// <reference types="vite/client" />

declare module '*.svg' {
  const content: string;
  export default content;
}

// 你也可以添加其他资源类型
declare module '*.png';
declare module '*.jpg';