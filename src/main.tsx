import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "pretendard/dist/web/static/pretendard.css"
import "./ds/tokens/tokens.css"
import "./app.css"
import App from "./App"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
