import { useEffect, useState } from "react"
import { API_BASE, to2DAssets, toCards } from "../lib/assets"
import type { Asset2D, AssetCard, RepoFile } from "../lib/assets"

export type AssetsState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ready"; cards: AssetCard[]; assets2d: Asset2D[] }

async function getFiles(url: string): Promise<RepoFile[]> {
  const res = await fetch(url)
  const files: unknown = await res.json()
  if (!Array.isArray(files)) throw new Error(`목록을 읽지 못했어요 (${res.status})`)
  return files as RepoFile[]
}

/** GitHub 에서 에셋 목록을 읽는다. 2D 목록이 실패해도 3D 카드는 보여 준다. */
export function useAssets(): AssetsState {
  const [state, setState] = useState<AssetsState>({ status: "loading" })

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const [files, files2d] = await Promise.all([
          getFiles(API_BASE),
          getFiles(`${API_BASE}/2d`).catch((e) => {
            console.error("2D 로드 실패", e)
            return [] as RepoFile[]
          }),
        ])
        if (!cancelled) setState({ status: "ready", cards: toCards(files), assets2d: to2DAssets(files2d) })
      } catch (e) {
        if (!cancelled) setState({ status: "error", message: e instanceof Error ? e.message : String(e) })
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  return state
}
