import { css } from 'styled-components'

export const scrollMedium = css`
  scrollbar-color: ${({ theme }) => null};

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
    border-radius: 8px;
  }
`
