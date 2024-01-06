import { components } from 'react-select'

import { PriorityType } from 'src/common/select/types'
import styles from './styles.module.css'
import { PriorityOptionProps } from './types'

const PriorityOption = ({ children, ...props }: PriorityOptionProps): JSX.Element => {
  return (
    <components.Option {...props}>
      <p className={styles.Dot}>{props.data.value as PriorityType}</p>
      {children}
    </components.Option>
  )
}

export { PriorityOption }
