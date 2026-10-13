import { describe, expect, it } from "vitest"
import { ALL, countryOf, countryOptions, filterCards, to2DAssets, toCards, toggleCountry } from "./assets"

const files = [
  { name: "COMMON_사물_event_halloween_bg.png" },
  { name: "COMMON_사물_event_halloween_bg.glb" },
  { name: "JAPAN_사물_torii.png" },
  { name: "KOREA_사물_hanbok.png" },
  { name: "KOREA_사물_hanbok.glb" },
  { name: "2d", type: "dir" },
]

describe("toCards", () => {
  const cards = toCards(files)

  it("PNG 하나당 카드 하나를 만든다", () => {
    expect(cards.map((c) => c.name)).toEqual([
      "COMMON_사물_event_halloween_bg",
      "JAPAN_사물_torii",
      "KOREA_사물_hanbok",
    ])
  })

  it("같은 이름의 GLB 가 있을 때만 glbUrl 을 채운다", () => {
    expect(cards[0].glbUrl).toMatch(/COMMON_사물_event_halloween_bg\.glb$/)
    expect(cards[1].glbUrl).toBeNull()
  })
})

describe("countryOf", () => {
  it("COMMON 으로 시작하면 COMMON, 아니면 첫 _ 앞", () => {
    expect(countryOf("COMMON_사물_a")).toBe("COMMON")
    expect(countryOf("JAPAN_사물_a")).toBe("JAPAN")
  })
})

describe("countryOptions", () => {
  it("ALL 을 포함해 정렬한다", () => {
    expect(countryOptions(toCards(files))).toEqual([ALL, "COMMON", "JAPAN", "KOREA"])
  })
})

describe("filterCards", () => {
  const cards = toCards(files)

  it("전체 선택이면 검색어만 적용한다", () => {
    expect(filterCards(cards, "HANBOK", new Set([ALL])).map((c) => c.country)).toEqual(["KOREA"])
  })

  it("선택한 국가만 남긴다", () => {
    expect(filterCards(cards, "", new Set(["JAPAN", "KOREA"]))).toHaveLength(2)
  })

  it("선택이 비어 있으면 아무것도 보이지 않는다", () => {
    expect(filterCards(cards, "", new Set())).toHaveLength(0)
  })
})

describe("toggleCountry", () => {
  it("개별 국가를 고르면 전체가 풀린다", () => {
    expect([...toggleCountry(new Set([ALL]), "JAPAN", true)]).toEqual(["JAPAN"])
  })

  it("전체를 고르면 나머지가 모두 풀린다", () => {
    expect([...toggleCountry(new Set(["JAPAN"]), ALL, true)]).toEqual([ALL])
  })

  it("전체를 풀면 선택이 비어 있다", () => {
    expect(toggleCountry(new Set([ALL]), ALL, false).size).toBe(0)
  })
})

describe("to2DAssets", () => {
  it("확장자를 뗀 이름과 2d 폴더 주소를 만든다", () => {
    expect(to2DAssets([{ name: "팥_Default.jpg" }])).toEqual([
      expect.objectContaining({ name: "팥_Default", imgUrl: expect.stringMatching(/assets\/2d\/팥_Default\.jpg$/) }),
    ])
  })
})
