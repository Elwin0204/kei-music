import type { SVGProps } from 'react';

/**
 * Slick Left 图标
 */
export const SlickLeft = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M15 19l-7-7 7-7"></path>
  </svg>
);

SlickLeft.displayName = 'SlickLeft';