import type { ChangeEventHandler, ReactNode } from "react"
import { CheckboxControl } from "../ds/components/Checkbox/CheckboxControl"

interface CheckboxProps {
  checked: boolean
  onChange: ChangeEventHandler<HTMLInputElement>
  children: ReactNode
  value?: string
  id?: string
}

/** 디자인 시스템의 체크박스 모양(CheckboxControl)에 실제 체크 기능을 붙인 것. */
export function Checkbox({ checked, onChange, children, value, id }: CheckboxProps) {
  return (
    <label className="checkbox">
      <input id={id} type="checkbox" className="checkbox__input" checked={checked} value={value} onChange={onChange} />
      <CheckboxControl checked={checked} />
      <span className="checkbox__label">{children}</span>
    </label>
  )
}
