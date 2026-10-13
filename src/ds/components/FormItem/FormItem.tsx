import { createContext, useContext, useId } from "react"
import type { HTMLAttributes, ReactNode } from "react"
import { FormLabel } from "../FormLabel/FormLabel"
import type { FormLabelProps } from "../FormLabel/FormLabel"
import "../../tokens/tokens.css"
import "./FormItem.css"

const FormItemContext = createContext<string | undefined>(undefined)

/** `FormItem` 안의 입력 칸이 레이블과 이어질 `id` 를 얻는다. 밖에서 쓰면 undefined. */
export function useFormItemId(explicitId?: string): string | undefined {
  const fromContext = useContext(FormItemContext)
  return explicitId ?? fromContext
}

export interface FormItemProps extends HTMLAttributes<HTMLDivElement> {
  /** Form.Label 에 넘길 속성 (text, isRequired, hasTag …) */
  label?: Omit<FormLabelProps, "htmlFor">
  /** 입력 칸: `Input`(InputGroup) · `Select` · `Textarea` */
  children?: ReactNode
}

/**
 * Figma `Form.Item`: Form.Label 과 입력 칸을 6px 간격으로 세로로 쌓는다.
 * 레이블의 `htmlFor` 와 안쪽 입력 칸의 `id` 는 자동으로 이어진다.
 */
export function FormItem({ label, children, className, ...rest }: FormItemProps) {
  const id = useId()
  const classes = ["ds-form-item", className].filter(Boolean).join(" ")

  return (
    <FormItemContext.Provider value={id}>
      <div className={classes} {...rest}>
        <FormLabel {...label} htmlFor={id} />
        {children}
      </div>
    </FormItemContext.Provider>
  )
}
