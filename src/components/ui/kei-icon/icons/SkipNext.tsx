import type { SVGProps } from 'react';

/**
 * 下一曲圖標
 * 特點：
 * - 双竖线代表轨道停止/分隔
 * - 向右的三角形代表快进/下一曲
 * - 设计与整体图标风格保持一致
 */
export const SkipNext = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    {...props}
  >
    <path fill="currentColor" d="M3 4.753c0-1.408 1.578-2.24 2.74-1.444l10.498 7.194a1.75 1.75 0 0 1 .01 2.88L5.749 20.685C4.59 21.492 3 20.66 3 19.248zM21 3.75a.75.75 0 0 0-1.5 0v16.5a.75.75 0 0 0 1.5 0z" />
  </svg>
);

SkipNext.displayName = 'SkipNext';