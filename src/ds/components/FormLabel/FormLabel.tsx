import type { LabelHTMLAttributes, ReactNode } from "react"
import biPlus from "../../assets/icons/bi-plus.svg"
import moreHoriz from "../../assets/icons/md-more-horiz.svg"
import textFormat from "../../assets/icons/md-text-format.svg"
import { Tag } from "../Tag/Tag"
import "../../tokens/tokens.css"
import "./FormLabel.css"

export interface FormLabelProps extends Omit<LabelHTMLAttributes<HTMLLabelElement>, "children"> {
  /** Figma의 `text` */
  text?: string
  /** Figma의 `isRequired`. 글자 뒤에 빨간 `*` 가 붙는다 (Figma 기본값 true). */
  isRequired?: boolean
  /** Figma의 `hasIcon` */
  hasIcon?: boolean
  /** 글자 앞 아이콘. 없으면 Figma 기본(MdTextFormat) */
  icon?: ReactNode
  /** Figma의 `hasTag` */
  hasTag?: boolean
  /** 태그 글자 (Figma 기본값 "Tag") */
  tag?: ReactNode
  /** Figma의 `hasRightSlot` (+ 와 ··· 아이콘 버튼) */
  hasRightSlot?: boolean
  onAdd?: () => void
  onMore?: () => void
  /** 맨 바깥 요소(div)에 붙는 클래스 */
  className?: string
}

/**
 * Figma `Form.Label` (폭 400px, 높이 20px).
 * 글자는 `<label>` 이라 `htmlFor` 로 입력 칸과 이어 쓴다. 오른쪽 버튼은 `<label>` 밖에 있어 클릭해도 입력 칸에 포커스가 가지 않는다.
 */
export function FormLabel({
  text = "레이블",
  isRequired = true,
  hasIcon = false,
  icon,
  hasTag = false,
  tag = "Tag",
  hasRightSlot = false,
  onAdd,
  onMore,
  className,
  ...labelProps
}: FormLabelProps) {
  const classes = ["ds-form-label", className].filter(Boolean).join(" ")

  return (
    <div className={classes}>
      {hasIcon && (icon ?? <img className="ds-form-label__icon" src={textFormat} alt="" />)}
      <label className="ds-form-label__contents" {...labelProps}>
        <span className="ds-form-label__text">{text}</span>
        {isRequired && (
          <>
            <span className="ds-form-label__required" aria-hidden="true">
              *
            </span>
            <span className="ds-form-label__sr-only">(필수)</span>
          </>
        )}
        {hasTag && <Tag closeButton={false}>{tag}</Tag>}
      </label>
      {hasRightSlot && (
        <div className="ds-form-label__right-slot">
          <button type="button" className="ds-form-label__icon-button" aria-label="추가" onClick={onAdd}>
            <img src={biPlus} alt="" />
          </button>
          <button type="button" className="ds-form-label__icon-button" aria-label="더보기" onClick={onMore}>
            <img src={moreHoriz} alt="" />
          </button>
        </div>
      )}
    </div>
  )
}
