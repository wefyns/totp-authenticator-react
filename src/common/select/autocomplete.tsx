import { Select } from './select'
import { SelectProps } from './types'

export const AutocompleteSelect = ({ components, ...props }: SelectProps): JSX.Element => (
  <Select
    {...props}
    isSearchable
    defaultControl
    components={{ DropdownIndicator: null, ...components }}
    noOptionsMessage={e => (e.inputValue ? 'No options' : null)}
    filterOption={(candidate, input) => {
      if (!input.length) return false
      return candidate.label.toLowerCase().includes(input.toLowerCase())
    }}
  />
)
