import type { CSSProperties, HTMLAttributes } from "react"
import avatar3d21 from "../../assets/images/avatar-3d-21.png"
import badgeMd from "../../assets/icons/avatar-badge.svg"
import badgeSm from "../../assets/icons/avatar-badge-sm.svg"
import "../../tokens/tokens.css"
import "./Avatar.css"

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  /** 이미지. `src`도 `name`도 없으면 Figma `3D Avatars / 21` 이미지를 쓴다. */
  src?: string
  alt?: string
  /** 이미지가 없을 때 보이는 글자(Figma `name`, 예: "TA") */
  name?: string
  /** 지름(px). Figma 에 있는 크기: 20 · 24(xs) · 28 · 48(md) */
  size?: number
  /** 이미지 뒤·글자 아래 배경색 */
  background?: string
  /** 글자 색 */
  textColor?: string
  /** 상태 점(AvatarBadge). 48px 은 22px, 그 외는 8px 에셋을 쓴다. */
  badge?: boolean
  /** 이미지 위치 (CSS object-position) */
  imagePosition?: string
}

/** Figma 에서 글자 크기가 정해진 경우만 그 값을, 나머지는 지름 비율로 쓴다. */
const INITIALS_SIZE: Record<number, number> = { 20: 9, 24: 9, 48: 20 }

export function Avatar({
  src,
  alt = "",
  name,
  size = 28,
  background,
  textColor,
  badge = false,
  imagePosition,
  className,
  style,
  ...rest
}: AvatarProps) {
  const image = src ?? (name ? undefined : avatar3d21)
  const large = size >= 40
  const badgeSrc = large ? badgeMd : badgeSm
  // 배지 에셋은 박스(large 16 · small 6)보다 커서 그만큼 바깥으로 삐져나온다.
  const badgeOffset = large ? -5 : -1
  const classes = ["ds-avatar", className].filter(Boolean).join(" ")
  const rootStyle = {
    "--avatar-size": `${size}px`,
    "--avatar-font-size": `${INITIALS_SIZE[size] ?? Math.round(size * 0.4)}px`,
    background,
    color: textColor,
    ...style,
  } as CSSProperties

  return (
    <span className={classes} style={rootStyle} {...rest}>
      {name && !image && <span className="ds-avatar__initials">{name}</span>}
      {image && (
        <img
          className="ds-avatar__image"
          src={image}
          alt={alt}
          style={imagePosition ? { objectPosition: imagePosition } : undefined}
        />
      )}
      {badge && (
        <img
          className="ds-avatar__badge"
          src={badgeSrc}
          alt=""
          style={{ right: badgeOffset, bottom: badgeOffset }}
        />
      )}
    </span>
  )
}
