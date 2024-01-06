import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react'

import styles from './styles.module.css'

interface DropdownProps extends React.PropsWithChildren<unknown> {
  button: React.ReactNode
}

export interface DropdownRef {
  close: () => void
}

export const Dropdown = forwardRef<DropdownRef, DropdownProps>((props, ref) => {
  const [isDropdown, setIsDropdown] = useState(false)
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  const toggleDropdown = (): void => {
    setIsDropdown(!isDropdown)
  }

  const closeDropdown = (): void => {
    setIsDropdown(false)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closeDropdown()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  useImperativeHandle(ref, () => ({
    close: closeDropdown,
  }))

  return (
    <div className={styles.container} ref={dropdownRef}>
      <div
        className={`${styles.dropdown} ${isDropdown ? styles.open : ''}`}
        onClick={toggleDropdown}
      >
        {props.button}
      </div>
      {isDropdown && (
        <div className={styles.content}>
          {React.Children.map(props.children, child => {
            return React.cloneElement(child as React.ReactElement, {
              onClick: () => {
                if ((child as React.ReactElement).props.onClick) {
                  ;(child as React.ReactElement).props.onClick()
                  closeDropdown()
                }
              },
            })
          })}
        </div>
      )}
    </div>
  )
})

Dropdown.displayName = 'Dropdown'
