// src/components/layout/components/HamburgerButton.tsx
import { type FC } from 'react';
import { cn } from '@/utils'; // 导入 cn

/**
 * HamburgerButton 组件
 *
 * 一个可切换的汉堡菜单按钮，用于在移动设备或小屏幕上展开/收起导航菜单。
 * 特点：
 * - 状态驱动：根据 `isOpen` 属性在“汉堡”图标 (☰) 和“X”图标 (✕) 之间切换。
 * - 平滑动画：使用 CSS 过渡和 SVG 动画效果，实现图标之间的流畅转换。
 * - 无障碍：提供 `aria-label` 和 `aria-expanded` 属性以增强可访问性。
 * - 可定制：允许外部通过 `className` 传入自定义样式。
 */
interface HamburgerButtonProps {
  isOpen: boolean;
  onToggle: () => void;
  'aria-label'?: string;
  className?: string; // 添加 className prop 以支持外部傳入樣式
}

export const HamburgerButton: FC<HamburgerButtonProps> = ({
  isOpen,
  onToggle,
  'aria-label': ariaLabel = '切换菜单',
  className = '' // 初始化 className
}) => {
  return (
    <button
      // 使用 cn 合并基础类名和外部传入的 className
      className={cn(
        "text-primary focus:outline-none transition-colors",
        className
      )}
      aria-expanded={isOpen}
      aria-label={ariaLabel}
      onClick={onToggle}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 relative"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        {/* 菜單圖標 (☰) - 預設顯示 */}
        <g 
          className={cn(
            `absolute inset-0 transition-transform duration-300 ease-in-out origin-center`,
            // 动态类名：根据 isOpen 状态决定显示/隐藏
            isOpen 
              ? 'scale-0 opacity-0'
              : 'scale-100 opacity-100'
          )}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 6h18"
            className="transition-all duration-500 ease-in-out"
            style={{
              strokeDasharray: 18,
              strokeDashoffset: isOpen ? 18 : 0,
            }}
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12h18"
            className="transition-all duration-500 ease-in-out delay-100"
            style={{
              strokeDasharray: 18,
              strokeDashoffset: isOpen ? 18 : 0,
            }}
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 18h18"
            className="transition-all duration-500 ease-in-out delay-200"
            style={{
              strokeDasharray: 18,
              strokeDashoffset: isOpen ? 18 : 0,
            }}
          />
        </g>

        {/* X 圖標 (✕) - 預設隱藏，打開時顯示 */}
        <g 
          className={cn(
            `absolute inset-0 transition-transform duration-300 ease-in-out origin-center`,
            // 动态类名：根据 isOpen 状态决定显示/隐藏
            isOpen 
              ? 'scale-100 opacity-100'
              : 'scale-0 opacity-0'
          )}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 6L18 18"
            className="transition-all duration-500 ease-in-out"
            style={{
              strokeDasharray: Math.sqrt((18-6)**2 + (18-6)**2), // 约 17
              strokeDashoffset: isOpen ? 0 : Math.sqrt((18-6)**2 + (18-6)**2),
            }}
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M18 6L6 18"
            className="transition-all duration-500 ease-in-out delay-100"
            style={{
              strokeDasharray: Math.sqrt((18-6)**2 + (18-6)**2), // 约 17
              strokeDashoffset: isOpen ? 0 : Math.sqrt((18-6)**2 + (18-6)**2),
            }}
          />
        </g>
      </svg>
    </button>
  );
};