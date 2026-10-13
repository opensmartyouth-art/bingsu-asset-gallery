import type { ButtonHTMLAttributes, ReactNode } from "react"
import goCheckSolid from "../../assets/icons/go-check-solid.svg"
import goCheckOutline from "../../assets/icons/go-check-outline.svg"
import "../../tokens/tokens.css"
import "./Button.css"

export type ButtonVariant = "solid" | "outline" | "subtle"
export type ButtonSize = "md" | "sm" | "lg"

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Figma의 `type` (Default → solid, outlline → outline).
   * `subtle` 은 PageHeader 의 CTA(회색 배경 버튼)에서 쓰는 sm 크기 전용이다.
   */
  variant?: ButtonVariant
  /**
   * `md`: 기본(32px). `sm`: PageHeader·툴바의 작은 버튼(24px). `lg`: 모달 아래 버튼(40px).
   * Figma 에 있는 조합은 md(solid, outline), sm(solid, subtle, outline), lg(solid, subtle)이다.
   */
  size?: ButtonSize
  /**
   * 글자 굵기. 기본은 크기에 따라 정해진다(md 는 Medium, sm · lg 는 SemiBold).
   * SettingList 의 md 버튼처럼 SemiBold 인 md 가 필요할 때 `semibold` 로 지정한다.
   */
  weight?: "medium" | "semibold"
  /** Figma의 `hasicon`. 기본 아이콘(GoCheck)은 md 에만 있어서 sm · lg 의 기본값은 false */
  hasIcon?: boolean
  /** 기본 아이콘 대신 쓸 아이콘 */
  icon?: ReactNode
  children?: ReactNode
}

/** Figma 에 기본 아이콘이 있는 변형만 (subtle 은 없음) */
const defaultIcons: Partial<Record<ButtonVariant, string>> = {
  solid: goCheckSolid,
  outline: goCheckOutline,
}

export function Button({
  variant = "solid",
  size = "md",
  weight,
  hasIcon = size === "md",
  icon = null,
  children = "Button",
  className,
  type = "button",
  ...rest
}: ButtonProps) {
  const classes = [
    "ds-button",
    `ds-button--${variant}`,
    size !== "md" && `ds-button--${size}`,
    weight === "semibold" && "ds-button--semibold",
    className,
  ]
    .filter(Boolean)
    .join(" ")
  const defaultIcon = defaultIcons[variant]

  return (
    <button type={type} className={classes} {...rest}>
      {hasIcon && (icon ?? (defaultIcon && <img className="ds-button__icon" src={defaultIcon} alt="" />))}
      <span>{children}</span>
    </button>
  )
}
