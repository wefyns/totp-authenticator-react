import { PropsWithChildren } from 'react'

import styles from './styles.module.css'

export const Modal = ({
  isVisible,
  setVisible,
  children,
}: PropsWithChildren<{
  isVisible: boolean
  setVisible: (value: boolean) => void
}>): JSX.Element => {
  return (
    <>
      {isVisible ? (
        <div className={styles.modal}>
          <div className={styles['modal-content']}>
            <div className={styles.close} onClick={() => setVisible(false)}>
              ×
            </div>
            {children}
          </div>
        </div>
      ) : null}
    </>
  )
}
