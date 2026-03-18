// src/components/layout/components/LanguageToggle.tsx
import { cn } from '@/utils';
import { useAppContext } from '@/components/AppProvider'; 
import { DropdownMenu } from "radix-ui"; 
import { CheckIcon } from '@radix-ui/react-icons';
import { KeiIcon } from '@/components/ui/kei-icon';

// 语言选项配置 - 与全局类型保持一致
const LANGUAGE_OPTIONS: Array<{ code: Language; label: string; flag: string }> = [
  { code: 'zh-CN', label: '中文', flag: '🇨🇳' },
  { code: 'en-US', label: 'English', flag: '🇺🇸' },
  { code: 'ja-JP', label: '日本語', flag: '🇯🇵' },
];

interface LanguageToggleProps {
  className?: string;
}

/**
 * LanguageToggle 组件
 *
 * 用于在不同语言之间切换的 UI 控件。
 * 特点：
 * - 使用 radix-ui 的 DropdownMenu 实现下拉菜单。
 * - 依赖于 AppProvider 管理的全局语言状态。
 * - 通过 store 的方法触发语言切换。
 * - 国旗标识：每个语言选项旁边显示对应的国旗 emoji。
 * - 当前语言高亮：选中的语言选项会被特殊标记。
 * - 解决了因 body 滚动锁定导致的页面抖动问题。
 */
export const LanguageToggle = ({ className }: LanguageToggleProps) => {
  // 从 AppProvider 获取状态和方法
  const { language: currentLocale, setLanguage } = useAppContext(); 

  const currentLangOption = LANGUAGE_OPTIONS.find(opt => opt.code === currentLocale);

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          className={cn(
            "flex items-center gap-1 p-2 rounded-full bg-transparent hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-1 focus:ring-ring",
            className
          )}
          aria-haspopup="true"
          aria-label="切换语言"
        >
          {/* 使用 KeiIcon 替换之前的占位符 */}
          <KeiIcon name="Globe" />
          <span className="ml-1 text-sm hidden sm:inline-block">{currentLangOption?.label}</span>
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content 
          className={cn(
            // 基础样式
            "min-w-40 overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50",
            // 动画效果 (可选，基于 Radix 的数据属性)
            "data-[side=top]:animate-slide-up-and-fade data-[side=right]:animate-slide-left-and-fade data-[side=bottom]:animate-slide-down-and-fade data-[side=left]:animate-slide-right-and-fade"
          )}
          sideOffset={5}
        >
          {LANGUAGE_OPTIONS.map((option) => (
            <DropdownMenu.Item
              key={option.code}
              className={cn(
                "relative flex items-center gap-2 text-sm px-4 py-2 cursor-pointer select-none outline-none",
                // 悬停时的颜色改为与主色相关
                "hover:bg-primary/10 hover:text-primary",
                // 当前选中项的样式 - 使用主色
                option.code === currentLocale 
                  ? 'text-primary font-medium' 
                  : 'text-gray-700 dark:text-gray-300'
              )}
              onClick={() => {
                setLanguage(option.code as Language); // 使用 store 提供的方法
              }}
            >
              <span>{option.flag}</span>
              <span>{option.label}</span>
              {option.code === currentLocale && (
                <DropdownMenu.ItemIndicator className="ml-auto">
                  <CheckIcon className="h-4 w-4 text-primary" />
                </DropdownMenu.ItemIndicator>
              )}
            </DropdownMenu.Item>
          ))}
          {/* 可选：添加箭头 */}
          <DropdownMenu.Arrow className="fill-white dark:fill-gray-800" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};