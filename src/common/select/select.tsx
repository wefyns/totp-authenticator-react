import clsx from 'clsx'
import { ReactElement } from 'react'
import ReactSelect from 'react-select'
import { useTranslation } from 'react-i18next'
import styled from './styles.module.css'
import { useStyles } from './helpers'

import { Control, MultiValue, PriorityOption, ClearIndicator } from './components'
import {
  SelectProps,
  SelectValue,
  SelectOption,
  MultiSelectValue,
  SingleSelectValue,
  SelectOptionProps,
} from './types'

const Select = ({
  name,
  large,
  label,
  error,
  options,
  priority,
  onChange,
  className,
  isDisabled,
  components,
  isCreatable,
  placeholder,
  isClearable,
  requiredText,
  defaultValue,
  isSearchable,
  defaultControl,
  containerStyle,
  errorOnlyBorder,
  ...props
}: SelectProps): ReactElement => {
  const { t } = useTranslation()
  const styles = useStyles(large, error)

  const getComponents = (): object => {
    let values: Record<string, object> = {}
    if (priority) {
      values = { Option: PriorityOption }
    } else {
      values = { ClearIndicator, Control, MultiValue }
    }
    if (defaultControl) {
      delete values.Control
    }
    return values
  }

  return (
    <div style={containerStyle} className={styled.wrapper}>
      {label && (
        <label className={clsx(styled.labels, { [styled.disabled]: isDisabled })}>
          {t(label)}&nbsp;
          <span className={styled.required}>{requiredText}</span>
        </label>
      )}

      <ReactSelect
        styles={styles}
        options={options}
        onChange={onChange}
        isDisabled={isDisabled}
        inputId={name ?? label}
        placeholder={placeholder ? t(placeholder) : ''}
        isClearable={isClearable}
        defaultValue={defaultValue}
        isSearchable={isSearchable}
        components={{
          ...getComponents(),
          ...components,
        }}
        {...props}
      />

      {error && !errorOnlyBorder && <div className={styled.error}>{error}</div>}
    </div>
  )
}

Select.defaultProps = {
  error: '',
  label: '',
  large: false,
  components: {},
  disabled: false,
  priority: false,
  requiredText: '',
  placeholder: 'Select',
  defaultValue: undefined,
  isSearchable: false,
}

export { Select }
export type {
  SelectProps,
  SelectValue,
  SelectOption,
  MultiSelectValue,
  SingleSelectValue,
  SelectOptionProps,
}
