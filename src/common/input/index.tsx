import clsx from 'clsx'

import { useState, useMemo, ChangeEvent } from 'react'

import { InputProps } from './types'
import { VariantFieldsType } from './config'

import styles from './styles.module.css'
import { Icons } from './assets'

export const Input = ({
  type,
  error,
  label,
  icon,
  style,
  value,
  onBlur,
  onChange,
  disabled,
  rightIcon,
  inputType,
  placeholder,
  withBorder = true,
  onRightIconClick,
}: InputProps): JSX.Element => {
  const [isPassword, setIsPassword] = useState(false)

  const togglePassword = (): void => {
    setIsPassword(prev => !prev)
  }

  const currentType = useMemo(() => {
    if (type === VariantFieldsType.password) {
      return isPassword ? VariantFieldsType.text : VariantFieldsType.password
    }

    return type
  }, [type, isPassword])

  const inputClasses = {
    [styles.styledInput]: true,
    [styles.borderInput]: withBorder,
    [styles.paddingIcon]: icon,
    [styles.paddingRightIcon]: rightIcon,
  }

  return (
    <div>
      {label && <div className={styles.label}>{label} </div>}

      <div className={styles.inputWrapper}>
        {inputType === 'textarea' ? (
          <textarea
            className={styles.textArea}
            style={style}
            value={value}
            disabled={disabled}
            placeholder={placeholder}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => onChange && onChange(e)}
          />
        ) : (
          <input
            className={clsx(inputClasses)}
            value={value}
            style={style}
            onBlur={onBlur}
            type={currentType}
            autoComplete="nope"
            placeholder={placeholder}
            disabled={disabled ?? false}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onChange && onChange(e)}
          />
        )}

        {icon && (
          <div className={styles.leftIcon}>
            <div>{icon}</div>
          </div>
        )}

        {rightIcon && (
          <div
            className={clsx(styles.rightIcon, { [styles.pointer]: !!onRightIconClick })}
            onClick={() => {
              if (onRightIconClick) {
                onRightIconClick()
              }
            }}
          >
            <div>{rightIcon}</div>
          </div>
        )}
      </div>

      {type === 'password' && (
        <div className={styles.IconEyes} onClick={togglePassword}>
          {isPassword ? (
            <div className={styles.Icon}>
              <Icons.EyeOn />
            </div>
          ) : (
            <div className={styles.Icon}>
              <Icons.EyeOff />
            </div>
          )}
        </div>
      )}

      {error && (
        <div className={styles.ErrorContainer}>
          <div className={styles.Error}>{`${error}`}</div>
        </div>
      )}
    </div>
  )
}
