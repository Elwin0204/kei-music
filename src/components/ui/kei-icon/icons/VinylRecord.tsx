import type { SVGProps } from 'react';

/**
 * 黑胶唱片图标 - 专为 kei-music 项目设计
 * 特点：
 * - 外圈模拟唱片沟槽（多层同心圆）
 * - 中心圆形标签（象征专辑封面）
 * - 真实比例中心孔
 * - 线条纤细优雅，适合怀旧主题
 */
export const VinylRecord = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    {/* 外圈唱片边缘 */}
    <circle cx="12" cy="12" r="10.5" />
    
    {/* 唱片沟槽（多层同心圆，模拟真实纹路） */}
    <circle cx="12" cy="12" r="9" opacity="0.6" />
    <circle cx="12" cy="12" r="7.5" opacity="0.4" />
    <circle cx="12" cy="12" r="6" opacity="0.3" />
    
    {/* 中心标签（专辑封面区域） */}
    <circle cx="12" cy="12" r="3.2" fill="none" />
    
    {/* 中心轴孔 */}
    <circle cx="12" cy="12" r="0.8" fill="currentColor" />
  </svg>
);

VinylRecord.displayName = 'VinylRecord';