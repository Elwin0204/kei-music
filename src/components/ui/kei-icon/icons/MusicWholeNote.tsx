// src/components/ui/icons/MusicWholeNote.tsx
import type { SVGProps } from 'react';

/**
 * 全音符 (Whole Note)
 */
export const MusicWholeNote = (props: SVGProps<SVGSVGElement>) => (
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
        d="M4855 6833 c-399 -31 -621 -74 -910 -173 -784 -271 -1265 -827 -1195 -1381 81 -635 829 -1177 1801 -1303 579 -76 1188 -10 1657 178 683 275 1082 730 1082 1236 0 273 -123 533 -365 774 -418 414 -1156 681 -1870 674 -88 -1 -178 -3 -200 -5z m576 -407 c225 -79 377 -299 424 -615 26 -167 16 -318 -31 -506 -107 -423 -401 -813 -739 -980 -109 -53 -190 -75 -283 -75 -165 0 -284 50 -402 168 -156 157 -230 363 -230 642 0 316 106 624 308 900 170 231 418 413 645 475 86 23 230 19 308 -9z">
      </path>
    </g>
  </svg>
);

MusicWholeNote.displayName = 'MusicWholeNote';