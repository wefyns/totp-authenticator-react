import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectTheme } from 'src/store/slices/settings'

export const ThemeWrap = ({ children }: React.PropsWithChildren): React.ReactNode => {
  const currentTheme = useSelector(selectTheme)

  useEffect(() => {
    document.body.setAttribute('data-theme', currentTheme)
  }, [currentTheme])

  return children
}
