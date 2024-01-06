import { useMediaQuery } from 'react-responsive'

const mobileMaxWidth = 767
const tabletMaxWidth = 1023

export const useIsDesktop = (): boolean => {
  return useMediaQuery({ minWidth: tabletMaxWidth + 1 })
}

export const useIsTablet = (): boolean => {
  return useMediaQuery({ minWidth: mobileMaxWidth + 1, maxWidth: tabletMaxWidth })
}

export const useIsTabletUp = (): boolean => {
  return useMediaQuery({ minWidth: mobileMaxWidth + 1 })
}

export const useIsMobile = (): boolean => {
  return useMediaQuery({ maxWidth: mobileMaxWidth })
}
