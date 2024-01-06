import { useTranslation } from 'react-i18next'

import { Icons } from './assets'
import { CheckboxProps } from './types'

import styles from './styles.module.css'

export const Checkbox = ({
  id,
  icon,
  label,
  disabled,
  className,
  block = false,
  checked = false,
  positionRightIcon,
  transparent = false,
  checkedIcon = <Icons.Check />,
  ...props
}: CheckboxProps): JSX.Element => {
  const { t } = useTranslation()

  const checkboxLabelClass = block ? styles.checkboxLabelBlock : styles.checkboxLabel
  const checkboxTextClass = block ? styles.checkboxTextBlock : styles.checkboxText
  const labelClass = disabled && block ? styles.disabledLabel : ''
  const additionalLabelClass = positionRightIcon ? styles.additionalLabelClass : ''
  return (
    <label
      htmlFor={label}
      className={`${checkboxLabelClass} ${labelClass} ${additionalLabelClass}`}
    >
      <input
        type="checkbox"
        className={styles.checkboxInput}
        checked={checked}
        disabled={disabled}
        id={label}
        {...props}
      />

      {label && <span className={styles.checkMark}>{checkedIcon}</span>}

      {label && <div className={checkboxTextClass}>{t(label)}</div>}
    </label>
  )
}
