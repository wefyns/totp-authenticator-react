import clsx from 'clsx'
import { FC } from 'react'
import { Colors, Icon } from './config'
import { AlertType } from './types'

import styles from './styles.module.css'
import { Icons } from './assets'

interface AlertProps {
  close: () => void
  message: string
  type: AlertType
}

const Alert: FC<AlertProps> = ({ close, message, type }) => (
  <div className={styles.alertContainer} data-variant={type}>
    <div className={styles.contentContainer}>
      {type && <div className={styles.iconContainer}>{Icon[type]}</div>}

      <div className={styles.textContainer}>
        <div>{message}</div>
      </div>

      <button type="button" className={styles.closeButton} onClick={close}>
        <Icons.Close />
      </button>

      <div className={clsx(styles.loadingLine, Colors[type ?? 'success'])}></div>
    </div>
  </div>
)

export default Alert
