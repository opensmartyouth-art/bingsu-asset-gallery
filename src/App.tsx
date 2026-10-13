import { useMemo, useState } from "react"
import { AssetCard } from "./components/AssetCard"
import { Sidebar } from "./components/Sidebar"
import { PageHeader } from "./ds/components/PageHeader/PageHeader"
import { useAssets } from "./hooks/useAssets"
import { ALL, countryOptions, filterCards, toggleCountry } from "./lib/assets"
import type { AssetCard as AssetCardData } from "./lib/assets"

/** 브라우저가 연달아 받기를 막지 않도록 파일 사이를 띄운다 */
const DOWNLOAD_INTERVAL_MS = 300

function downloadAll(cards: AssetCardData[]) {
  const targets = cards.filter((c) => c.glbUrl)
  if (!targets.length) {
    alert("다운로드할 GLB 파일이 없습니다.")
    return
  }
  targets.forEach((c, i) => {
    setTimeout(() => {
      const a = document.createElement("a")
      a.href = c.glbUrl!
      a.download = `${c.name}.glb`
      a.click()
    }, i * DOWNLOAD_INTERVAL_MS)
  })
}

export default function App() {
  const assets = useAssets()
  const [query, setQuery] = useState("")
  const [selected, setSelected] = useState<ReadonlySet<string>>(new Set([ALL]))
  const [show2D, setShow2D] = useState(false)

  const cards = assets.status === "ready" ? assets.cards : []
  const countries = useMemo(() => countryOptions(cards), [cards])
  const filtered = useMemo(() => filterCards(cards, query, selected), [cards, query, selected])

  return (
    <>
      <div className="app-header">
        <PageHeader
          hasBackButton={false}
          hasTag={false}
          icon={<span className="app-header__emoji" aria-hidden="true">🍧</span>}
          title="빙수 월드 투어 — 에셋 갤러리"
          description="사물 에셋 모음 · GLB 다운로드"
          actions={assets.status === "ready" && <span className="app-header__count">{filtered.length}개</span>}
        />
      </div>

      <Sidebar
        query={query}
        onQueryChange={setQuery}
        countries={countries}
        selected={selected}
        onCountryChange={(c, checked) => setSelected((prev) => toggleCountry(prev, c, checked))}
        show2D={show2D}
        onShow2DChange={setShow2D}
        resultCount={filtered.length}
        onDownloadAll={() => downloadAll(filtered)}
      />

      <main className="main">
        {assets.status === "loading" && <p className="main__message">에셋 불러오는 중...</p>}
        {assets.status === "error" && <p className="main__message">불러오기 실패: {assets.message}</p>}
        {assets.status === "ready" && (
          <>
            <div className="grid">
              {filtered.map((c) => (
                <AssetCard
                  key={c.name}
                  name={c.name}
                  badge={c.country}
                  imgUrl={c.imgUrl}
                  downloadUrl={c.glbUrl}
                  downloadLabel="GLB 다운로드"
                />
              ))}
            </div>
            {filtered.length === 0 && <p className="main__message">검색 결과가 없습니다.</p>}

            {show2D && (
              <section className="section-2d">
                <h2 className="section-2d__title">
                  2D 그래픽 <span className="section-2d__style">Pixel Style</span>
                </h2>
                <div className="grid">
                  {assets.assets2d.map((a) => (
                    <AssetCard
                      key={a.name}
                      name={a.name}
                      badge="2D"
                      imgUrl={a.imgUrl}
                      downloadUrl={a.imgUrl}
                      downloadLabel="다운로드"
                    />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </main>
    </>
  )
}
