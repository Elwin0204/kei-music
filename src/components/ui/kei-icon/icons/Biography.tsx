import type { SVGProps } from 'react';

/**
 * 生平圖標 - 象徵個人歷史與故事
 * 特點：
 * - 人形剪影代表個人形象
 * - 書卷線條象徵記錄與傳記
 * - 線條簡潔，符合整體設計風格
 */
export const Biography = (props: SVGProps<SVGSVGElement>) => (
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
      <path d="m4 16l6-7l5 5l5-6" />
      <path d="M14 14a1 1 0 1 0 2 0a1 1 0 1 0-2 0M9 9a1 1 0 1 0 2 0a1 1 0 1 0-2 0m-6 7a1 1 0 1 0 2 0a1 1 0 1 0-2 0m16-8a1 1 0 1 0 2 0a1 1 0 1 0-2 0" />
    </g>
  </svg>
);

Biography.displayName = 'Biography';
