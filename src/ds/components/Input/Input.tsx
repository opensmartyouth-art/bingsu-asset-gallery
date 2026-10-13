import type { HTMLAttributes, InputHTMLAttributes } from "react"
import { useFormItemId } from "../FormItem/FormItem"
import "../../tokens/tokens.css"
import "./Input.css"

export type InputProps = InputHTMLAttributes<HTMLInputElement>

/**
 * Figma `Input` (높이 32px, 좌우 12px, 테두리 gray 200, 모서리 6px).
 * Figma 에서 확인한 것은 기본 모습뿐이라 disabled·invalid 의 시각 스타일은 따로 정하지 않았고,
 * 브라우저 기본 동작(`disabled`, `aria-invalid`)만 따른다.
 */
export function Input({ id, className, type = "text", ...rest }: InputProps) {
  const inputId = useFormItemId(id)
  const classes = ["ds-input", className].filter(Boolean).join(" ")

  return <input id={inputId} type={type} className={classes} {...rest} />
}

/** Figma `InputGroup`: Input 을 가로로 놓는 묶음 (지금은 Input 하나만 있다) */
export function InputGroup({ className, children, ...rest }: HTMLAttributes<HTMLDivElement>) {
  const classes = ["ds-input-group", className].filter(Boolean).join(" ")

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  )
}
