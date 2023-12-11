import * as React from 'react'
import type { SVGProps } from 'react'
export const IconLoading = (
  props: SVGProps<SVGSVGElement>
): React.ReactElement => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    color="#C4C4C4"
    viewBox="0 0 100 100"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}
  >
    <defs>
      <linearGradient id="icon-loading_svg__a">
        <stop offset="0%" stopColor="currentColor" stopOpacity={0} />
        <stop offset="100%" stopColor="currentColor" stopOpacity={0.5} />
      </linearGradient>
      <linearGradient id="icon-loading_svg__b">
        <stop offset="0%" stopColor="currentColor" />
        <stop offset="100%" stopColor="currentColor" stopOpacity={0.5} />
      </linearGradient>
    </defs>
    <g strokeWidth={12}>
      <path stroke="url(#icon-loading_svg__a)" d="M10 50a20 20 0 0 1 80 0" />
      <path stroke="url(#icon-loading_svg__b)" d="M90 50a20 20 0 0 1-80 0" />
      <path
        stroke="currentColor"
        strokeLinecap="round"
        d="M10 50a20 20 0 0 1 0-2"
      />
    </g>
  </svg>
)
