import type { SVGProps } from 'react';

/**
 * Close Circle Broken 图标
 * 特點：
 * - 圓形外框象徵按鈕區域
 * - 內部交叉線條構成「X」，清晰表達關閉意圖
 * - 線條末端斷開，增加視覺層次與設計感
 * - 線條簡潔，符合整體設計風格
 */
export const CloseCircleBroken = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <g>
      {/* 外圈 */}
      <path d="M7 3.338A9.95 9.95 0 0 1 12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12c0-1.821.487-3.53 1.338-5" />
      {/* 內部 X 符號 */}
      <path d="m14.5 9.5l-5 5m0-5l5 5" />
    </g>
  </svg>
);

CloseCircleBroken.displayName = 'CloseCircleBroken';