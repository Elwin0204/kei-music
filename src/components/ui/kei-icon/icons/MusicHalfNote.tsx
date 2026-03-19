// src/components/ui/icons/MusicHalfNote.tsx
import type { SVGProps } from 'react';

/**
 * 二分音符 (Half Note)
 */
export const MusicHalfNote = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 10240 10240"
    fill="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <g>
      <path
        d="M3764 9740 c-348 -33 -612 -200 -740 -466 -61 -127 -84 -242 -84 -419 0 -242 36 -398 141 -606 252 -504 758 -899 1314 -1027 265 -61 597 -54 800 17 l55 19 2 -3265 3 -3266 28 -21 c26 -19 43 -21 226 -24 180 -3 198 -2 213 15 9 10 41 82 72 159 234 603 461 995 906 1564 346 443 474 641 600 925 98 220 166 467 196 704 19 154 18 477 -1 628 -58 441 -253 899 -508 1189 -35 40 -43 44 -86 44 -40 0 -52 -5 -79 -33 -52 -53 -66 -105 -66 -247 l0 -125 48 -105 c84 -188 142 -385 172 -590 50 -345 -35 -744 -228 -1057 -101 -167 -263 -343 -616 -672 -79 -74 -178 -173 -221 -221 l-78 -87 -7 262 c-4 144 -7 1379 -6 2746 2 2739 7 2526 -59 2722 -140 414 -572 852 -1051 1066 -191 86 -252 105 -481 152 -118 25 -319 33 -465 19z">
      </path>
    </g>
  </svg>
);

MusicHalfNote.displayName = 'MusicHalfNote';