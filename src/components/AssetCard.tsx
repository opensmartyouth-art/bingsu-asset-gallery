import { Tag } from "../ds/components/Tag/Tag"
import { DownloadIcon } from "./icons"

interface AssetCardProps {
  name: string
  /** 칩에 보일 글자 (국가 또는 2D) */
  badge: string
  imgUrl: string
  /** 받을 파일 주소. 없으면 "준비 중" */
  downloadUrl: string | null
  downloadLabel: string
}

export function AssetCard({ name, badge, imgUrl, downloadUrl, downloadLabel }: AssetCardProps) {
  return (
    <article className="asset-card">
      <div className="asset-card__image">
        <img src={imgUrl} alt={name} loading="lazy" />
      </div>
      <div className="asset-card__body">
        <Tag closeButton={false}>{badge}</Tag>
        <p className="asset-card__name">{name}</p>
        {downloadUrl ? (
          // 디자인 시스템 Button 은 <button> 만 만들 수 있어 링크에는 같은 클래스를 쓴다
          <a className="ds-button ds-button--solid ds-button--sm asset-card__download" href={downloadUrl} download>
            <DownloadIcon size={14} />
            {downloadLabel}
          </a>
        ) : (
          <span className="ds-button ds-button--outline ds-button--sm asset-card__download asset-card__download--disabled">
            준비 중
          </span>
        )}
      </div>
    </article>
  )
}
