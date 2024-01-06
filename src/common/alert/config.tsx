import { Types } from './types'

import styles from './styles.module.css'

export const Icon = {
  [Types.success]: null,
  [Types.error]: null,
  [Types.info]: null,
}

export const Colors = {
  [Types.success]: styles.success,
  [Types.error]: styles.error,
  [Types.info]: styles.error,
}

export const Title = {
  [Types.success]: 'Success',
  [Types.error]: 'Error',
  [Types.info]: 'Info',
}
