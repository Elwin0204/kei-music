// src/components/layout/components/ThemeToggle.tsx
import { KeiIcon } from '@/components/ui/kei-icon';
import { cn } from '@/utils';
import { type FC } from 'react';
// 从新的 AppProvider 导入 Hook
import { useAppContext } from '@/components/AppProvider'; 

/**
 * ThemeToggle 组件
 *
 * 一个用于在浅色、深色和系统主题之间切换的按钮。
 * 特点：
 * - 依赖于 AppProvider 管理的全局主题状态。
 * - 通过 store 的方法触发主题切换。
 * - 图标切换：根据当前主题状态显示对应的图标 (Sun, Moon, Computer)。
 * - 可定制：允许外部通过 `className` 传入自定义样式。
 */
interface ThemeToggleProps extends React.HTMLAttributes<HTMLButtonElement> {}

export const ThemeToggle: FC<ThemeToggleProps> = ({ className, ...props }) => {
  // 从 AppProvider 获取状态和方法
  const { theme: currentTheme, setTheme } = useAppContext();

  // 定义循环顺序，方便切换
  const themeCycle: Theme[] = ['light', 'dark'];
  const currentIndex = themeCycle.indexOf(currentTheme);
  const nextIndex = (currentIndex + 1) % themeCycle.length;
  const nextTheme = themeCycle[nextIndex];

  const handleToggle = () => {
    setTheme(nextTheme);
  };

  // 根据当前主题选择图标
  const renderIcon = () => {
    switch (currentTheme) {
      case 'light':
        return <KeiIcon name="Sun" />;
      case 'dark':
        return <KeiIcon name="Moon" />;
      default:
        return <KeiIcon name="Sun" />;
    }
  };

  return (
    <button
      onClick={handleToggle} // 使用 store 提供的方法
      className={cn(
        "p-2 rounded-full bg-transparent hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-1 focus:ring-ring",
        className
      )}
      aria-label={`切换到 ${nextTheme === 'light' ? '浅色' : nextTheme === 'dark' ? '深色' : '系统'} 主题`}
      {...props}
    >
      {renderIcon()}
    </button>
  );
};