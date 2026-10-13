import type { HTMLAttributes, ReactNode } from "react"
import arrowBack from "../../assets/icons/md-arrow-back.svg"
import autoAwesome from "../../assets/icons/md-auto-awesome.svg"
import { Avatar } from "../Avatar/Avatar"
import type { AvatarProps } from "../Avatar/Avatar"
import { Tag } from "../Tag/Tag"
import "../../tokens/tokens.css"
import "./PageHeader.css"

export type PageHeaderType = "default" | "profile"

export interface PageHeaderProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  /**
   * Figma의 `type`.
   * - `default`: 높이 64px, 아이콘 + 제목 + 태그 + 설명이 한 줄
   * - `profile`: 높이 80px, 48px 아바타 + 제목/태그 아래에 설명
   */
  type?: PageHeaderType
  title?: string
  description?: string
  /** Figma의 `hasBackButton` */
  hasBackButton?: boolean
  onBack?: () => void
  /** Figma의 `hasTag` */
  hasTag?: boolean
  /** 태그 글자 (Figma 기본값 "Tag") */
  tag?: ReactNode
  /** `default` 타입의 제목 앞 아이콘(24px). 없으면 Figma 기본 아이콘(MdAutoAwesome). */
  icon?: ReactNode
  /** `profile` 타입의 아바타 속성 (Figma Avatar: size md · badge · name · src) */
  avatar?: Pick<AvatarProps, "src" | "alt" | "name" | "badge">
  /** 오른쪽 CTA 영역 (버튼 sm 크기 두 개가 기본 구성) */
  actions?: ReactNode
}

export function PageHeader({
  type = "default",
  title = "페이지타이틀",
  description = "설명 텍스트를 적어줍니다.",
  hasBackButton = true,
  onBack,
  hasTag = true,
  tag = "Tag",
  icon,
  avatar,
  actions,
  className,
  ...rest
}: PageHeaderProps) {
  const classes = ["ds-page-header", `ds-page-header--${type}`, className].filter(Boolean).join(" ")
  const tagNode = hasTag && <Tag closeButton={false}>{tag}</Tag>

  return (
    <header className={classes} {...rest}>
      {hasBackButton && (
        <button type="button" className="ds-page-header__back" aria-label="뒤로 가기" onClick={onBack}>
          <img src={arrowBack} alt="" />
        </button>
      )}

      {type === "default" ? (
        <div className="ds-page-header__content ds-page-header__content--default">
          {icon ?? <img className="ds-page-header__icon" src={autoAwesome} alt="" />}
          <h1 className="ds-page-header__title">{title}</h1>
          {tagNode}
          <p className="ds-page-header__description">{description}</p>
        </div>
      ) : (
        <>
          <Avatar
            size={48}
            background="var(--color-gray-400)"
            name="TA"
            badge
            {...avatar}
          />
          <div className="ds-page-header__content ds-page-header__content--profile">
            <div className="ds-page-header__texts">
              <div className="ds-page-header__title-row">
                <h1 className="ds-page-header__title">{title}</h1>
                {tagNode}
              </div>
              <p className="ds-page-header__description">{description}</p>
            </div>
          </div>
        </>
      )}

      {actions && <div className="ds-page-header__actions">{actions}</div>}
    </header>
  )
}
