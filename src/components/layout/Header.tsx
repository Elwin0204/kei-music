// src/components/layout/Header.tsx
import { type FC, useState, useRef, useEffect } from 'react'
import { HamburgerButton } from './components/HamburgerButton'
import { MobileMenu } from './components/MobileMenu'
import { DesktopNav } from './components/DesktopNav'
import { NavItem } from './types'
import { Logo } from './components/Logo'
import { ThemeToggle } from './components/ThemeToggle'
import { useLocation } from 'react-router'
import { LanguageToggle } from './components/LanguageToggle'
import { BackButton } from '../ui/back-button';
import { useAppContext } from '../AppProvider'
import { MusicToggle } from './components/MusicToggle'

export const Header: FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation();
  
  const { t } = useAppContext();

  const headerRef = useRef<HTMLHeadElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: TouchEvent) => {
      if (isMenuOpen && headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isMenuOpen]);

  // 使用翻译函数动态生成导航项
  const navItems: NavItem[] = [
    { label: '生平', value: 'biography',  path: '/biography', icon: 'Biography' },
    { label: '作品', value: 'music', path: '/music', icon: 'Music' },
    { label: '演唱会', value: 'concerts', path: '/concerts', icon: 'Concert' },
    { label: '联系', value: 'contact', path: '/contact', icon: 'Contact' },
  ]

  // 根据当前路径确定页面标题
  const getPageTitle = () => {
    const currentItem = navItems.find(item => item.path === location.pathname);
    if (currentItem) {
      return t(`nav.${currentItem.value}`);
    }
    // 可以为首页或其他未定义路径设置默认标题
    if (location.pathname === '/') {
      return t('nav.home'); // 使用翻译函数获取首页标题
    }
    return '';
  };

  const pageTitle = getPageTitle();

  const isHomePage = location.pathname === '/';

  const handleLinkClick = () => {
    setIsMenuOpen(false)
  }

  return (
    <header
      ref={headerRef}
      aria-label="网站主导航"
      className="sticky top-0 z-50 bg-transparent backdrop-blur-sm border-b border-primary/20"
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* PC 端 Logo 始终显示，移动端根据页面判断 */}
        <div className="md:hidden"> {/* 仅在移动端显示 */}
          {!isHomePage ? (
            <BackButton className="" /> // 移动端非首页显示返回按钮
          ) : (
            <Logo onClick={handleLinkClick} />
          )}
        </div>
        <div className="hidden md:block"> {/* 仅在 PC 端显示 */}
          <Logo onClick={handleLinkClick} />
        </div>

        <div className="flex md:hidden items-center justify-center flex-1 px-4"> {/* 移动端显示标题 */}
          <h1 className="text-lg font-semibold text-foreground truncate max-w-[60vw]">{pageTitle}</h1> {/* 标题居中，限制最大宽度 */}
        </div>

        <DesktopNav navItems={navItems} />

        {/* PC 端新增语言切换按钮，主题切换按钮，移动端隐藏 */}
        <div className="hidden md:flex items-center space-x-2">
          <MusicToggle />
          <LanguageToggle />
          <ThemeToggle />
        </div>

        <HamburgerButton
          isOpen={isMenuOpen}
          onToggle={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "关闭菜单" : "打开菜单"}
          className="md:hidden"
        />
      </div>

      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        navItems={navItems} // 传递翻译后的导航项
      />
    </header>
  )
}

export default Header