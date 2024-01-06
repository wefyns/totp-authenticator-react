import clsx from 'clsx'
import { ButtonHTMLAttributes } from 'react'

import styles from './styles.module.css'

export interface ButtonBaseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  to?: string
  text: string
  ref?: string
  padding?: string
  image?: string
  icon?: JSX.Element
  disabled?: boolean
  customStyle?: string
  variant?: 'primary' | 'secondary' | 'tertiary'
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export const Button = ({
  to,
  text,
  style = {},
  icon,
  ref,
  image,
  variant = 'primary',
  onClick,
  padding,
  disabled,
  customStyle,
  ...props
}: ButtonBaseProps): JSX.Element => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    if (onClick) {
      onClick(e)
    }
  }

  const buttonClassName = clsx(styles.button, variant && styles[variant], customStyle)

  return (
    <button
      style={{ ...style, opacity: disabled ? 0.8 : 1 }}
      onClick={e => handleClick(e)}
      className={buttonClassName}
      {...props}
    >
      {image && <img src={image} alt="icon" />}
      {icon && icon}

      {text && <span>{text}</span>}
    </button>
  )
}
