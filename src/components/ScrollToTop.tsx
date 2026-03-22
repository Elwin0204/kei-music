// src/components/ScrollToTop.tsx
import { useEffect } from 'react';
import { useLocation } from 'react-router';

/**
 * ScrollToTop 组件
 * 一个用于在路由变化时自动滚动到页面顶部的组件。
 * 应当放置在路由树的顶层，例如 App.tsx 中。
 */
export const ScrollToTop: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth', // 平滑滚动
    });
  }, [pathname]); // 仅在路径变化时执行

  return <>{children}</>;
};