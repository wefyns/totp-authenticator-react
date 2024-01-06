import { ClearIndicatorProps, components } from 'react-select'
import { SelectIcons } from '../../assets'

type Props = ClearIndicatorProps<unknown>

export const ClearIndicator = ({ children, ...props }: Props): JSX.Element => {
  return (
    <components.ClearIndicator {...props}>
      <SelectIcons.Close />
    </components.ClearIndicator>
  )
}
