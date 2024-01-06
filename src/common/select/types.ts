import { MultiValue, Props, SingleValue, OptionProps } from 'react-select'

export enum PriorityType {
  High = 'High',
  Medium = 'Medium',
  Low = 'Low',
}

export interface SelectOption extends Record<string, unknown> {
  label: string
  value: string
  disabled?: boolean
  name?: PriorityType
}

export interface SelectProps extends Props<SelectOption> {
  name?: string
  error?: string
  label?: string
  large?: boolean
  isMulti?: boolean
  className?: string
  priority?: boolean
  placeholder?: string
  isCreatable?: boolean
  requiredText?: string
  defaultControl?: boolean
  errorOnlyBorder?: boolean
  containerStyle?: React.CSSProperties
  onCreateOption?: (inputValue: string) => void
}

export type SelectValue = SelectProps['value']
export type SelectOptionProps = OptionProps<SelectOption>
export type SingleSelectValue = SingleValue<SelectOption> | undefined
export type MultiSelectValue = MultiValue<SelectOption> | undefined
