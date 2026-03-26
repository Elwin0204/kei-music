// src/components/layout/MainLayout.tsx
import { useEffect, type ReactNode } from 'react'
import { Outlet, useLocation } from 'react-router'
import Header from './Header'
import Footer from './Footer'
import { ThemeToggle } from './components/ThemeToggle'
import { LanguageToggle } from './components/LanguageToggle'
import { MusicToggle } from './components/MusicToggle'

/**
 * 主布局：包裹所有页面
 * - 包含 Header 和 Footer
 * - 页面内容通过 <Outlet /> 注入
 */
export default function MainLayout({ children }: { children?: ReactNode }) {
  const location = useLocation(); // 获取当前的 location 对象

  useEffect(() => {
    // 当 location.pathname 发生变化时，滚动到顶部
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [location.pathname]);
  
  return (
    <>
      <Header />
      <main>
        {children || <Outlet />} {/* 支持直接传 children 或自动注入 */}

        {/* 移动端工具栏 */}
        <div className="fixed bottom-4 right-2 z-40 md:hidden flex flex-col items-center space-y-2">
          <MusicToggle />
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </main>
      <Footer />
    </>
  )
}