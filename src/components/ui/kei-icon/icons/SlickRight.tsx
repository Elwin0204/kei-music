import type { SVGProps } from 'react';

/**
 * Slick Right 图标
 */
export const SlickRight = ({ className, ...props }: SVGProps<SVGSVGElement>) => (
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
    <path d="M9 5l7 7-7 7" />
  </svg>
);

SlickRight.displayName = 'SlickRight';