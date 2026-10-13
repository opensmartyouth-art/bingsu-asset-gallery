import { Button } from "../ds/components/Button/Button"
import { FormLabel } from "../ds/components/FormLabel/FormLabel"
import { Input, InputGroup } from "../ds/components/Input/Input"
import { ALL } from "../lib/assets"
import { Checkbox } from "./Checkbox"
import { DownloadIcon, SearchIcon } from "./icons"

interface SidebarProps {
  query: string
  onQueryChange: (query: string) => void
  countries: string[]
  selected: ReadonlySet<string>
  onCountryChange: (country: string, checked: boolean) => void
  show2D: boolean
  onShow2DChange: (show: boolean) => void
  resultCount: number
  onDownloadAll: () => void
}

export function Sidebar({
  query,
  onQueryChange,
  countries,
  selected,
  onCountryChange,
  show2D,
  onShow2DChange,
  resultCount,
  onDownloadAll,
}: SidebarProps) {
  return (
    <aside className="sidebar">
      <section className="sidebar__section">
        <FormLabel text="검색" isRequired={false} htmlFor="search" />
        <InputGroup className="search">
          <SearchIcon size={16} />
          <Input
            id="search"
            type="search"
            placeholder="파일명 검색..."
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
          />
        </InputGroup>
      </section>

      <section className="sidebar__section">
        <FormLabel text="국가" isRequired={false} />
        <div className="sidebar__list" role="group" aria-label="국가">
          {countries.map((c) => (
            <Checkbox
              key={c}
              value={c}
              checked={selected.has(c)}
              onChange={(e) => onCountryChange(c, e.target.checked)}
            >
              {c === ALL ? "전체" : c}
            </Checkbox>
          ))}
        </div>
      </section>

      <section className="sidebar__section">
        <FormLabel text="Pixel Style" isRequired={false} />
        <div className="sidebar__list" role="group" aria-label="Pixel Style">
          <Checkbox checked={show2D} onChange={(e) => onShow2DChange(e.target.checked)}>
            2D 그래픽
          </Checkbox>
        </div>
      </section>

      <div className="sidebar__footer">
        <p className="sidebar__count">{resultCount}개 에셋</p>
        <Button className="sidebar__download" icon={<DownloadIcon size={16} />} onClick={onDownloadAll}>
          필터 결과 전체 다운로드
        </Button>
      </div>
    </aside>
  )
}
