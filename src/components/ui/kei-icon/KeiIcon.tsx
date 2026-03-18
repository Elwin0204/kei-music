// src/components/ui/kei-icon/KeiIcon.tsx
import * as React from 'react';
import type { SVGProps } from 'react';
import { cn } from '@/utils';
import { ICON_MAP } from './icons';
import type { KeiIconName } from './icons';

export interface KeiIconProps extends SVGProps<SVGSVGElement> {
  name: KeiIconName;
  /**
   * 图标尺寸，支持数字或 CSS 长度字符串（如 24, "1.5em"）
   * @default 24
   */
  size?: number | string;
}

/**
 * KeiIcon - 动态渲染 kei-music 项目中的自定义图标
 * 
 * 特点：
 * - 动态加载：根据传入的 `name` 属性动态渲染对应的 SVG 图标组件。
 * - 尺寸控制：通过 `size` 属性统一设置图标的宽高。
 * - 样式整合：使用 `cn` 函数合并外部传入的 `className` 与内置样式。
 * - 无障碍：默认设置 `aria-hidden="true"` 和 `focusable="false"`，可通过 `aria-label` 覆盖。
 * - 安全兜底：对无效的图标名称提供运行时错误提示。
 * - 样式优化：图标默认具有 `1em` 宽高，隐藏溢出，并垂直对齐以匹配文字基线。
 * 
 * 示例:
 *   <KeiIcon name="KeiLogo" size={32} className="text-red-600" />
 *   <KeiIcon name="VinylRecord" size="1.8rem" />
 *   <span>Some Text <KeiIcon name="ExternalLink" /></span> // 优化后的垂直对齐
 */
export const KeiIcon = React.forwardRef<SVGSVGElement, KeiIconProps>(
  (
    {
      name,
      size = 24, // 保持默认值不变，允许通过 props 控制
      className, // 提取 className
      style,
      'aria-label': ariaLabel,
      'aria-hidden': ariaHidden = true,
      ...props
    },
    ref
  ) => {
    const IconComponent = ICON_MAP[name];

    // 安全兜底：理论上 TS 已保证 name 合法，但保留运行时防护
    if (!IconComponent) {
      if (process.env.NODE_ENV !== 'production') {
        console.error(
          `[KeiIcon] Unexpected icon name: "${name}". Available icons:`,
          Object.keys(ICON_MAP)
        );
      }
      return null;
    }

    return (
      <IconComponent
        ref={ref}
        width={size}
        height={size}
        className={cn(className)}
        style={{
          width: typeof size === 'number' ? `${size}px` : size,
          height: typeof size === 'number' ? `${size}px` : size,
          display: 'inline-block',
          flexShrink: 0,
          overflow: 'hidden',
          verticalAlign: 'middle', // 新增：优化垂直对齐，'middle' 通常比 '-0.15em' 更稳定
          // 如果需要更精细的对齐，可以使用 verticalAlign: '-0.15em'，
          // 但 'middle' 或 'text-bottom' 通常能提供更好的通用性
          ...style,
        }}
        aria-label={ariaLabel}
        aria-hidden={ariaHidden}
        focusable={false}
        role={ariaLabel ? 'img' : undefined}
        {...props}
      />
    );
  }
);

KeiIcon.displayName = 'KeiIcon';