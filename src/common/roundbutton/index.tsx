import { ButtonHTMLAttributes } from 'react'
import styles from './styles.module.css'

export interface RoundButtonBaseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  disabled?: boolean
  icon?: JSX.Element
  backgroundcolor?: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export const RoundButton = ({
  style = {},
  icon,
  onClick,
  disabled,
  backgroundcolor,
  ...props
}: RoundButtonBaseProps): JSX.Element => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    if (onClick) {
      onClick(e)
    }
  }

  return (
    <button
      style={{ ...style, opacity: disabled ? 0.8 : 1, background: backgroundcolor }}
      onClick={e => handleClick(e)}
      className={styles.roundButton}
      {...props}
    >
      {icon}
    </button>
  )
}
