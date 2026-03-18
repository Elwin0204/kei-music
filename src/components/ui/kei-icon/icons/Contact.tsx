
import type { SVGProps } from 'react';

/**
 * 聯繫圖標 - 象徵溝通與連結
 * 特點：
 * - 經典信封符號代表聯絡方式
 * - 簡潔直觀，符合通用設計模式
 */
export const Contact = (props: SVGProps<SVGSVGElement>) => (
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
    {/* 信封輪廓 */}
    <path d="M4 4 H20 C20.5 4 21 4.5 21 5 V19 C21 19.5 20.5 20 20 20 H4 C3.5 20 3 19.5 3 19 V5 C3 4.5 3.5 4 4 4 Z" />
    {/* 信封內的信件折痕 */}
    <path d="M3 8 L12 14 L21 8" />
    {/* 右上角折角 */}
    <path d="M21 4 L17 8" />
  </svg>
);

Contact.displayName = 'Contact';