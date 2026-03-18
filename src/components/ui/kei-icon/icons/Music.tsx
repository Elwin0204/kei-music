import type { SVGProps } from 'react';

/**
 * 作品圖標 - 象徵創作與成就
 * 特點：
 * - 音符符號代表音樂作品
 * - 筆尖或獎章元素象徵創作或成就
 * - 設計與整體圖標風格保持一致
 */
export const Music = (props: SVGProps<SVGSVGElement>) => (
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
      <circle cx="12" cy="12" r="2" />
      <circle cx="18" cy="9" r="2" />
      <path d="M15.318 3.631a9 9 0 1 0 5.368 10.736M20 9V2l2 2" />
    </g>
  </svg>
);

Music.displayName = 'Music';