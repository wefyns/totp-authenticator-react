import { InputHTMLAttributes, ChangeEventHandler } from 'react'

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string
  label?: string
  block?: boolean
  checked?: boolean
  icon?: JSX.Element
  disabled?: boolean
  transparent?: boolean
  positionRightIcon?: boolean
  checkedIcon?: JSX.Element
  onChange?: ChangeEventHandler<HTMLInputElement>
}
