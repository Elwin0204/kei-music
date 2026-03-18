// src/components/layout/MainLayout.tsx
import type { ReactNode } from 'react'
import { Outlet } from 'react-router'
import Header from './Header'
import Footer from './Footer'
import { ThemeToggle } from './components/ThemeToggle'
import { LanguageToggle } from './components/LanguageToggle'

/**
 * 主布局：包裹所有页面
 * - 包含 Header 和 Footer
 * - 页面内容通过 <Outlet /> 注入
 */
export default function MainLayout({ children }: { children?: ReactNode }) {
  return (
    <>
      <Header />
      <main>
        {children || <Outlet />} {/* 支持直接传 children 或自动注入 */}

        {/* 移动端工具栏 */}
        <div className="fixed bottom-4 right-4 z-40 md:hidden flex flex-col items-end space-y-2">
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </main>
      <Footer />
    </>
  )
}