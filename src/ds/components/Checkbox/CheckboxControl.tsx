import checked from "../../assets/icons/checkbox-control.svg"
import unchecked from "../../assets/icons/checkbox-sm.svg"
import "../../tokens/tokens.css"
import "./CheckboxControl.css"

export interface CheckboxControlProps {
  /** Figma 의 `isChecked`. 에셋은 선택됨(파랑 + 체크)과 선택 안 됨 두 가지뿐이다. */
  checked?: boolean
  className?: string
}

/**
 * 12px 체크박스 **모양**(Figma `Checkbox` 의 `.control`, size sm · colorScheme blue).
 * 보이기만 하는 부품이며 상태를 바꾸는 기능은 없다. indeterminate·disabled 에셋은 이 디자인들에 없다.
 */
export function CheckboxControl({ checked: isChecked = false, className }: CheckboxControlProps) {
  const classes = ["ds-checkbox-control", className].filter(Boolean).join(" ")

  return <img className={classes} src={isChecked ? checked : unchecked} alt="" />
}
