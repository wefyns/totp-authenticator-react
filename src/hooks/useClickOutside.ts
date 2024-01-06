import { useEffect, RefObject } from 'react'

type Props = {
  onClick?: () => void
  ref: RefObject<HTMLDivElement>
  targetRef?: RefObject<HTMLElement>
}

export const useClickOutside = ({ onClick, ref, targetRef }: Props): void => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      const isOutsideTarget1 = ref.current && !ref.current.contains(event.target as Node)
      const isOutsideTarget2 =
        targetRef?.current && !targetRef.current.contains(event.target as Node)

      if (onClick) {
        if (isOutsideTarget1 ?? isOutsideTarget2) {
          onClick()
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClick, ref, targetRef])
}
