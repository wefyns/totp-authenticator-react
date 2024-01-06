import { FC, ReactNode, createContext, useCallback, useContext, useState } from 'react'
import Alert from './alert'
import { AlertType } from './types'

import styles from './styles.module.css'

interface AlertProps {
  id: number
  message: string
  type: AlertType
}

interface AlertContextType {
  show: (message: string) => void
  success: (message: string) => void
  error: (message: string) => void
}

const AlertContext = createContext<AlertContextType | undefined>(undefined)

export const useAlert = (): AlertContextType => {
  const context = useContext(AlertContext)
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider')
  }
  return context
}

interface AlertProviderProps {
  children: ReactNode
}

export const AlertProvider: FC<AlertProviderProps> = ({ children }) => {
  const [alerts, setAlerts] = useState<AlertProps[]>([])

  const removeAlert = useCallback(
    (id: number) => {
      setAlerts(alerts.filter(alert => alert.id !== id))
    },
    [alerts]
  )

  const addAlert = useCallback(
    (message: string, type: AlertType = 'info') => {
      const id = new Date().getTime()
      setAlerts([...alerts, { id, message, type }])
      setTimeout(() => removeAlert(id), 5000)
    },
    [alerts]
  )

  const alertMethods = {
    show: (message: string) => addAlert(message),
    success: (message: string) => addAlert(message, 'success'),
    error: (message: string) => addAlert(message, 'error'),
  }

  return (
    <AlertContext.Provider value={alertMethods}>
      {children}
      <div className={styles['alert-wrapper']}>
        {alerts.map(alert => (
          <Alert key={alert.id} {...alert} close={() => removeAlert(alert.id)} />
        ))}
      </div>
    </AlertContext.Provider>
  )
}
