// src/components/layout/components/MobileMenu.tsx
import { KeiIcon } from '@/components/ui/kei-icon';
import { cn } from '@/utils'; // 导入 cn
import { type FC } from 'react';
import { Link, useLocation } from 'react-router';
import { NavItem } from '../types';
import { useAppContext } from '@/components/AppProvider';

/**
 * MobileMenu 组件
 *
 * 用于移动设备的侧滑导航菜单。
 * 特点：
 * - 响应式：仅在小屏幕尺寸 (md以下) 显示。
 * - 开关动画：根据 `isOpen` 属性控制菜单的展开/收起动画。
 * - 项目延迟动画：菜单项依次淡入并滑入，提升视觉效果。
 * - 活跃项高亮：当前路由对应的菜单项会被突出显示。
 * - 自动关闭：点击任意菜单项后会自动调用 `onClose` 关闭菜单。
 * - 图标支持：每个导航项旁边可以显示一个小图标。
 */
interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: Array<NavItem>;
}

export const MobileMenu: FC<MobileMenuProps> = ({ isOpen, onClose, navItems }) => {
  const location = useLocation();
  const { t } = useAppContext();

  return (
    <nav
      id="mobile-menu"
      aria-label="移动设备主菜单"
      // 使用 cn 合并基础类名和动态类名
      className={cn(
        "md:hidden overflow-hidden transition-all duration-500 ease-out",
        // 动态类名：根据 isOpen 状态控制最大高度
        isOpen ? 'max-h-screen' : 'max-h-0'
      )}
    >
      <div className="bg-transparent backdrop-blur-sm border-t border-primary/20 shadow-lg">
        <ul className="container mx-auto px-4 py-4 space-y-1"> {/* 缩小内边距和列表项间距 */}
          {navItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <li
                key={item.path}
                // 使用 cn 合并基础类名和动态类名
                className={cn(
                  "transform transition-all duration-700 ease-out",
                  // 动态类名：根据 isOpen 状态控制位置和透明度
                  isOpen
                    ? 'translate-x-0 opacity-100'
                    : 'translate-x-full opacity-0'
                )}
                style={{
                  transitionDelay: isOpen ? `${index * 100}ms` : '0ms',
                }}
              >
                <Link
                  to={item.path}
                  // 使用 cn 合并基础类名和动态类名
                  className={cn(
                    `flex items-center gap-2 py-3 px-2`, // 缩小链接内边距，但仍保持一定空间
                    // 动态类名：根据 isActive 状态设置颜色和背景
                    isActive
                      ? 'text-primary bg-primary/10'
                      : 'text-foreground',
                    // 通用类名：圆角和过渡效果
                    "rounded-md transition-colors duration-200"
                  )}
                  aria-current={isActive ? 'page' : undefined}
                  onClick={onClose}
                >
                  <KeiIcon name={item.icon} size={20} className="shrink-0 text-primary" />
                  { t(`nav.${item.value}`) }
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};