import type { SVGProps } from "react"

/* Material Symbols (Outlined, 400) — Apache-2.0. 색은 currentColor 를 따른다. */
function Icon({ d, size = 16, ...rest }: { d: string; size?: number } & SVGProps<SVGSVGElement>) {
  return (
    <svg width={size} height={size} viewBox="0 -960 960 960" fill="currentColor" aria-hidden="true" {...rest}>
      <path d={d} />
    </svg>
  )
}

export function DownloadIcon(props: { size?: number }) {
  return (
    <Icon
      {...props}
      d="M480-313 287-506l43-43 120 120v-371h60v371l120-120 43 43-193 193ZM220-160q-24 0-42-18t-18-42v-143h60v143h520v-143h60v143q0 24-18 42t-42 18H220Z"
    />
  )
}

export function SearchIcon(props: { size?: number }) {
  return (
    <Icon
      {...props}
      d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.500-75.500T120-580q0-109 75.500-184.500T380-840q109 0 184.500 75.500T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.500-52.500T560-580q0-75-52.500-127.500T380-760q-75 0-127.500 52.500T200-580q0 75 52.500 127.500T380-400Z"
    />
  )
}
