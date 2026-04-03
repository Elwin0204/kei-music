// src/components/layout/components/DesktopNav.tsx
import { KeiIcon } from '@/components/ui/kei-icon';
import { cn } from '@/utils';
import { type FC, useRef, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { NavItem } from '../types';
import { useAppContext } from '@/components/AppProvider';

/**
 * DesktopNav 组件
 *
 * 用于桌面端的主导航栏。
 * 特点：
 * - 响应式：仅在中等及以上屏幕尺寸 (md+) 显示。
 * - 活跃项指示：使用一条动态移动的下划线来指示当前活跃的导航项。
 * - 悬停效果：非活跃项在悬停时显示渐变出现的下划线。
 * - 图标支持：每个导航项旁边可以显示一个小图标。
 * - 平滑动画：下划线移动和悬停效果均使用流畅的 CSS 过渡动画。
 * - 国际化适配：当下拉语言改变时，会重新计算活跃项下划线的尺寸。
 */
interface DesktopNavProps {
  navItems: Array<NavItem>;
}

interface UnderlineStyleState {
  width: string;
  transform: string;
  opacity: number;
}

export const DesktopNav: FC<DesktopNavProps> = ({ navItems }) => {
  const location = useLocation();
  // 从上下文获取翻译函数和当前语言
  const { t, language: currentLocale } = useAppContext();
  const ulRef = useRef<HTMLUListElement>(null);
  const activeItemRefs = useRef<{[key: string]: HTMLLIElement | null}>({});

  const [underlineStyle, setUnderlineStyle] = useState<UnderlineStyleState>({
    width: '0',
    transform: 'translateX(0)',
    opacity: 0,
  });

  // 查找当前活跃的导航项
  const activeItem = navItems.find(item => location.pathname === item.path);
  const hasActiveItem = !!activeItem;

  // 当路由路径或语言改变时，重新计算下划线的位置和尺寸
  useEffect(() => {
    console.log('路由路径或语言改变，重新计算下划线位置和尺寸...', location.pathname);
    
    if (!ulRef.current) return;

    if (hasActiveItem && activeItem) {
      // 有活跃项，显示下划线
      const activeRef = activeItemRefs.current[activeItem.path];
      if (!activeRef) return;

      const ulRect = ulRef.current.getBoundingClientRect();
      const activeRect = activeRef.getBoundingClientRect();

      const width = Math.round(activeRect.width);
      const offsetLeft = Math.round(activeRect.left - ulRect.left);

      setUnderlineStyle({
        width: `${width}px`,
        transform: `translateX(${offsetLeft}px)`,
        opacity: 1,
      });
    } else {
      // 没有活跃项，隐藏下划线
      setUnderlineStyle({
        width: '0',
        transform: 'translateX(0)',
        opacity: 0,
      });
    }
  }, [location.pathname, currentLocale, hasActiveItem, activeItem]); // 添加相关依赖

  return (
    <nav aria-label="主菜单" className="hidden md:block relative">
      <ul 
        ref={ulRef}
        className="flex space-x-8 items-center"
      >
        {/* 全局底線 (只響應路由變化) */}
        <li 
          className="absolute bottom-0 h-0.5 bg-primary pointer-events-none"
          style={{
            width: underlineStyle.width,
            transform: underlineStyle.transform,
            opacity: underlineStyle.opacity,
            // 使用更長的時間和更流暢的緩動函數
            transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
          aria-hidden="true"
        />
        
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <li 
              key={item.path} 
              ref={(el) => {
                activeItemRefs.current[item.path] = el;
              }}
              className="relative cursor-pointer group"
            >
              {/* 修改: 使用 cn 合并类名 */}
              <Link
                to={item.path}
                className={cn(
                  `
                    inline-flex items-center gap-1.5 text-base font-medium py-1.5
                    transition-colors duration-300 ease-out
                  `,
                  // 动态类名
                  isActive
                    ? 'text-primary'
                    : 'text-foreground hover:text-primary'
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                {/* 修改: 可以选择固定尺寸或使用 props.size */}
                <KeiIcon name={item.icon} size={20} className="shrink-0" /> {/* 调整图标大小 */}
                { t(`nav.${item.value}`) }
                
                {/* 非激活項的 Hover 底線 (從 0 增長) - 獨立於全局底線 */}
                {/* 修改: 将 span 的 top/bottom 定位调整为 bottom-0，并设置 height */}
                {!isActive && (
                  <span 
                    className={cn(
                      `
                        absolute bottom-0 left-0 w-full h-0.5 bg-primary
                        origin-left
                        transition-transform duration-300 ease-out
                        scale-x-0 group-hover:scale-x-100
                      `
                    )}
                    aria-hidden="true"
                  />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};