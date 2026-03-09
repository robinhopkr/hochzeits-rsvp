import { cn } from '@/lib/utils/cn'

interface BrandIconProps {
  className?: string
}

interface BrandLogoProps extends BrandIconProps {
  label: string
  labelClassName?: string
}

export function BrandIcon({ className }: BrandIconProps) {
  return (
    <svg
      aria-hidden="true"
      className={cn('h-10 w-10 flex-none drop-shadow-[0_10px_18px_rgba(201,139,23,0.18)]', className)}
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="512" height="512" rx="120" fill="#FFF9F2" />
      <rect x="44" y="44" width="424" height="424" rx="104" fill="#F5E6D0" />
      <ellipse cx="256" cy="270" rx="148" ry="156" fill="#FFF6E8" />
      <ellipse cx="256" cy="376" rx="132" ry="24" fill="#E9D2AE" opacity="0.72" />
      <path
        d="M188 186C171 165 168 143 176 122C203 126 218 142 220 170C209 184 199 189 188 186Z"
        fill="#8CA17A"
      />
      <path
        d="M324 186C341 165 344 143 336 122C309 126 294 142 292 170C303 184 313 189 324 186Z"
        fill="#8CA17A"
      />
      <path
        d="M220 196C228 214 233 229 236 244"
        fill="none"
        stroke="#C99322"
        strokeLinecap="round"
        strokeWidth="12"
      />
      <path
        d="M292 196C284 214 279 229 276 244"
        fill="none"
        stroke="#C99322"
        strokeLinecap="round"
        strokeWidth="12"
      />
      <ellipse cx="256" cy="146" rx="24" ry="36" fill="#D9A2A5" />
      <ellipse cx="222" cy="170" rx="22" ry="34" fill="#D9A2A5" transform="rotate(-38 222 170)" />
      <ellipse cx="290" cy="170" rx="22" ry="34" fill="#D9A2A5" transform="rotate(38 290 170)" />
      <ellipse cx="232" cy="206" rx="22" ry="32" fill="#D9A2A5" transform="rotate(18 232 206)" />
      <ellipse cx="280" cy="206" rx="22" ry="32" fill="#D9A2A5" transform="rotate(-18 280 206)" />
      <circle cx="256" cy="184" r="20" fill="#FFF9F2" />
      <circle cx="256" cy="184" r="8" fill="#C99322" />
      <path
        d="M154 188L172 170L190 188L172 206Z"
        fill="#D7AD56"
        opacity="0.72"
      />
      <path
        d="M340 174L352 162L364 174L352 186Z"
        fill="#D7AD56"
        opacity="0.72"
      />
      <circle cx="210" cy="302" r="78" fill="none" stroke="#C99322" strokeWidth="28" />
      <circle cx="302" cy="302" r="78" fill="none" stroke="#D7AD56" strokeWidth="28" />
      <path
        d="M256 372C248 372 239 365 229 356C204 334 190 317 190 295C190 278 203 266 220 266C233 266 245 272 256 287C267 272 279 266 292 266C309 266 322 278 322 295C322 317 308 334 283 356C273 365 264 372 256 372Z"
        fill="#D28E90"
      />
      <path
        d="M256 352C251 352 245 347 238 341C221 327 212 315 212 300C212 289 220 282 231 282C239 282 247 286 256 297C265 286 273 282 281 282C292 282 300 289 300 300C300 315 291 327 274 341C267 347 261 352 256 352Z"
        fill="#FFF9F2"
      />
    </svg>
  )
}

export function BrandLogo({ className, label, labelClassName }: BrandLogoProps) {
  return (
    <span className={cn('inline-flex items-center gap-3', className)}>
      <BrandIcon className="h-11 w-11" />
      <span className={cn('font-display text-xl text-charcoal-900', labelClassName)}>{label}</span>
    </span>
  )
}
