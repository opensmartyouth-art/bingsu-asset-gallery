import type { HTMLAttributes, ReactNode } from "react"
import tagCloseButton from "../../assets/icons/tag-close-button.svg"
import "../../tokens/tokens.css"
import "./Tag.css"

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  children?: ReactNode
  /** Figma의 `variant`. `subtle`: 회색 배경, `outline`: 회색 테두리 + 연한 글자(List.Item 의 제목 옆 태그) */
  variant?: "subtle" | "outline"
  /** Figma의 `closeButton`. 닫기(×) 아이콘은 보이기만 하는 장식이다. */
  closeButton?: boolean
}

/** Figma `Tag` (colorScheme gray · size sm) */
export function Tag({ children = "Tag", variant = "subtle", closeButton = true, className, ...rest }: TagProps) {
  const classes = ["ds-tag", variant === "outline" && "ds-tag--outline", className].filter(Boolean).join(" ")

  return (
    <span className={classes} {...rest}>
      <span className="ds-tag__label">{children}</span>
      {closeButton && <img className="ds-tag__close" src={tagCloseButton} alt="" />}
    </span>
  )
}

/** 태그를 6px 간격으로 나란히 놓는다 (Figma `Tags`). */
export function TagList({ className, children, ...rest }: HTMLAttributes<HTMLSpanElement>) {
  const classes = ["ds-tag-list", className].filter(Boolean).join(" ")

  return (
    <span className={classes} {...rest}>
      {children}
    </span>
  )
}
