export const GITHUB_USER = "opensmartyouth-art"
export const REPO_NAME = "bingsu-asset-gallery"
export const RAW_BASE = `https://raw.githubusercontent.com/${GITHUB_USER}/${REPO_NAME}/main/assets`
export const API_BASE = `https://api.github.com/repos/${GITHUB_USER}/${REPO_NAME}/contents/assets`

/** GitHub contents API 응답에서 쓰는 필드 */
export interface RepoFile {
  name: string
  type?: string
}

export interface AssetCard {
  name: string
  country: string
  imgUrl: string
  /** 같은 이름의 GLB 가 없으면 null */
  glbUrl: string | null
}

export interface Asset2D {
  name: string
  imgUrl: string
}

/** 필터에서 "전체"를 뜻하는 값 */
export const ALL = "ALL"

/** `COMMON_…` 은 COMMON, 그 밖에는 첫 `_` 앞이 국가 */
export function countryOf(name: string): string {
  return name.startsWith("COMMON") ? "COMMON" : name.split("_")[0]
}

/** PNG 하나가 카드 하나. 같은 이름의 GLB 가 있으면 다운로드 주소를 붙인다. */
export function toCards(files: RepoFile[]): AssetCard[] {
  const glbs = new Set(files.filter((f) => f.name.endsWith(".glb")).map((f) => f.name))
  return files
    .filter((f) => f.name.endsWith(".png"))
    .map((f) => {
      const name = f.name.replace(".png", "")
      const glbName = `${name}.glb`
      return {
        name,
        country: countryOf(name),
        imgUrl: `${RAW_BASE}/${f.name}`,
        glbUrl: glbs.has(glbName) ? `${RAW_BASE}/${glbName}` : null,
      }
    })
}

export function to2DAssets(files: RepoFile[]): Asset2D[] {
  return files.map((f) => ({
    name: f.name.replace(/\.[^.]+$/, ""),
    imgUrl: `${RAW_BASE}/2d/${f.name}`,
  }))
}

/** 사이드바에 보일 국가 목록. "ALL" 을 포함해 이름순으로 정렬한다. */
export function countryOptions(cards: AssetCard[]): string[] {
  return [ALL, ...new Set(cards.map((c) => c.country))].sort()
}

/** 검색어(대소문자 무시)와 국가 선택을 모두 만족하는 카드. 선택이 비어 있으면 아무것도 보이지 않는다. */
export function filterCards(cards: AssetCard[], query: string, countries: ReadonlySet<string>): AssetCard[] {
  const q = query.toLowerCase()
  return cards.filter(
    (c) => c.name.toLowerCase().includes(q) && (countries.has(ALL) || countries.has(c.country)),
  )
}

/** 국가 체크박스를 눌렀을 때의 새 선택. "전체"는 나머지를 모두 해제한다. */
export function toggleCountry(selected: ReadonlySet<string>, value: string, checked: boolean): Set<string> {
  if (value === ALL) return checked ? new Set([ALL]) : new Set()
  const next = new Set(selected)
  next.delete(ALL)
  if (checked) next.add(value)
  else next.delete(value)
  return next
}
