import { components, MultiValueProps } from 'react-select'
import styles from './styles.module.css'

type Props = MultiValueProps<unknown>

export const MultiValue = (props: Props): JSX.Element => {
  return (
    <components.MultiValue {...props}>
      <div className={styles.Text}>{props.children}</div>
    </components.MultiValue>
  )
}
