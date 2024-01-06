import { useMemo } from 'react'
import { OptionProps, ControlProps, SingleValueProps, CSSObjectWithLabel } from 'react-select'

import { SelectOption } from './types'

export const useStyles = (large?: boolean, error?: string): object => {
  const customStyles = useMemo(
    () => ({
      menuPortal: (css: CSSObjectWithLabel) => ({
        ...css,
        zIndex: 9999,
      }),
      container: (css: CSSObjectWithLabel) => ({
        ...css,

        '.rs-option-icon, .rs-search-icon, .rs-searchable-option-icon': {
          lineHeight: 0,
        },
      }),

      valueContainer: (css: CSSObjectWithLabel) => ({
        ...css,
        padding: '8px 56px 8px 16px',
      }),

      multiValue: (css: CSSObjectWithLabel) => {
        return {
          ...css,
          color: 'var(--select-default-text)',
        }
      },

      placeholder: (css: CSSObjectWithLabel) => ({
        ...css,
        color: 'var(--select-disabled-text)',
        fontWeight: 400,
        fontSize: '14px',
        lineHeight: '24px',
      }),

      control: (css: CSSObjectWithLabel, state: ControlProps<SelectOption>) => ({
        ...css,
        width: '236px',
        minHeight: large ? '48px' : '24px',
        padding: '0 10px 0 0px',
        borderRadius: '30px',
        boxShadow: '0px 2px 6px rgba(0, 0, 0, 0.08)',
        background: state.isDisabled ? 'var(--select-default-bg)' : 'var(--select-default-bg)',
        border: 'none',
        transition: 'border-color 0.2s ease-in-out',

        '&:hover': {
          borderColor: state.isFocused
            ? 'var(--select-border-active)'
            : (error && 'var(--select-border-errorHover)') ?? 'var(--select-border-hover)',
        },

        '@media screen and (max-width: 500px)': {
          width: '320px',
        },

        cursor: 'pointer',

        '.rs-search-icon': {
          display: state.menuIsOpen ? 'block' : 'none',
          transform: state.menuIsOpen ? 'rotate(180deg)' : 'rotate(0)',
          marginRight: '8px',

          '& path': {
            fill: 'var(--select-default-text)',
          },
        },

        '.rs-searchable-option-icon': {
          display: state.menuIsOpen ? 'none' : 'inherit',
        },
      }),

      singleValue: (css: CSSObjectWithLabel, state: SingleValueProps<SelectOption>) => ({
        ...css,
        columnGap: 8,
        marginRight: 0,
        marginLeft: 0,
        color: state.isDisabled ? 'var(--select-disabled-text)' : 'var(--select-default-text)',
      }),

      input: (css: CSSObjectWithLabel) => ({
        ...css,
        color: 'var(--select-default-text)',

        '& input': {
          fontWeight: 400,
          fontSize: '14px',
          lineHeight: '24px',
          caretColor: 'var(--select-default-text)',
        },
      }),

      indicatorsContainer: (css: CSSObjectWithLabel) => {
        return {
          ...css,
          display: 'flex',
          alignItems: 'center',
          maxHeight: large ? '58px' : '48px',
        }
      },

      indicatorContainer: (css: CSSObjectWithLabel) => {
        return { ...css, padding: 0 }
      },

      indicatorSeparator: (css: CSSObjectWithLabel) => {
        return { ...css, display: 'none' }
      },

      dropdownIndicator: (css: CSSObjectWithLabel, state: ControlProps<SelectOption>) => {
        const { isDisabled, menuIsOpen } = state.selectProps

        return {
          ...css,
          padding: '0',
          svg: {
            transform: `rotate(${menuIsOpen ? '180deg' : '0deg'})`,
            path: {
              fill: 'var(--select-default-text)',

              ...(isDisabled && { fill: 'var(--select-disabled-text)' }),
            },
            transition: 'transform 0.3s ease-out',
          },
        }
      },

      clearIndicator: (css: CSSObjectWithLabel) => {
        return {
          ...css,

          path: { fill: 'var(--select-clearIcon)' },
        }
      },

      menu: (css: CSSObjectWithLabel, state: ControlProps<SelectOption>) => {
        const { menuIsOpen } = state.selectProps

        return {
          ...css,
          marginTop: 10,
          marginBottom: 0,
          borderRadius: '8px',
          overflow: 'hidden',
          opacity: menuIsOpen ? '1' : '0',
          boxShadow: '0px 8px 24px 0px #001B4714',
          backgroundColor: 'var(--select-default-bg)',
          zIndex: 2,
          transition: 'opacity 2s ease-out',
        }
      },

      menuList: (css: CSSObjectWithLabel, state: ControlProps<SelectOption>) => {
        const { menuIsOpen } = state.selectProps

        return {
          ...css,
          margin: '16px',
          padding: 0,
          opacity: menuIsOpen ? '1' : '0',
          transition: 'opacity 0.2s ease-out',
          scrollBehavior: 'smooth',
        }
      },

      option: (css: CSSObjectWithLabel, state: OptionProps<SelectOption>) => {
        const { isSelected, isDisabled } = state
        let color

        if (isDisabled) {
          color = 'var(--select-disabled-text)'
        } else if (isSelected) {
          color = 'var(--select-text-active)'
        } else {
          color = 'var(--select-default-text)'
        }

        return {
          ...css,
          display: 'flex',
          alignItems: 'center',
          columnGap: 8,
          padding: '8px 16px',
          fontWeight: 400,
          fontSize: '14px',
          lineHeight: '24px',
          color: color,
          cursor: 'pointer',
          transition: 'background 0.2s ease-out',
          background:
            (state.isSelected && 'var(--select-option-selected)') || 'var(--select-default-bg)',

          ':hover': {
            color: 'var(--select-text-active)',
            background: 'var(--select-option-hover)',
          },
        }
      },
    }),
    [large, error]
  )

  return customStyles
}
