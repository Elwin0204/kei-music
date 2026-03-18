import type { SVGProps } from 'react';

/**
 * 演出圖標 - 象徵舞台與現場
 * 特點：
 * - 舞台燈光或聚光燈效果
 * - 觀眾席或舞台輪廓
 * - 動感與能量的視覺表現
 */
export const Concert = (props: SVGProps<SVGSVGElement>) => (
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
      <path d="M7 8a5 5 0 0 1 10 0v3a5 5 0 0 1-10 0z" />
      <path d="M11 8h2m-3 3h4m6-1v1a8 8 0 1 1-16 0v-1m8 9v3" />
    </g>
  </svg>
);

Concert.displayName = 'Concert';