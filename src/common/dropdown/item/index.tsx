import React from 'react'
import styles from './styles.module.css'

interface DropdownItemProps {
  style?: React.CSSProperties
  children: React.ReactNode
  onClick?: () => void
}

export const DropdownItem: React.FC<DropdownItemProps> = ({ children, style, onClick }) => {
  return (
    <div style={style} onClick={onClick && onClick} className={styles.item}>
      {children}
    </div>
  )
}
