import { HTMLProps, ChangeEvent, FocusEventHandler } from 'react'

export interface InputProps
  extends Omit<HTMLProps<HTMLInputElement | HTMLTextAreaElement>, 'size'> {
  type?: string
  error?: string
  label?: string
  icon?: JSX.Element
  inputType?: string
  disabled?: boolean
  placeholder?: string
  withBorder?: boolean
  rightIcon?: JSX.Element
  placeholderColor?: string
  style?: React.CSSProperties
  onRightIconClick?: () => void
  onBlur?: FocusEventHandler<HTMLInputElement>
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}
