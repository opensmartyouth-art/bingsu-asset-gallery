import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"

// GitHub Pages 프로젝트 사이트 주소: https://<user>.github.io/bingsu-asset-gallery/
export default defineConfig({
  base: "/bingsu-asset-gallery/",
  plugins: [react()],
  test: { environment: "node" },
})
