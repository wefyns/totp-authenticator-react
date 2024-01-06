import { components, ControlProps } from 'react-select'

import styles from './styles.module.css'
import { SelectIcons } from '../../assets'

type Props = ControlProps<unknown>

export const Control = ({ children, ...props }: Props): JSX.Element => {
  return (
    <components.Control {...props}>
      {props.selectProps.isSearchable && (
        <div className={styles.SearchContainer}>
          <SelectIcons.Search />
        </div>
      )}
      {children}
    </components.Control>
  )
}
