import React from 'react'
import { Navigate } from 'react-router-dom'
import { AppRoutes } from './routes'

export function AuthRoute({ children }: React.PropsWithChildren): JSX.Element {
  const isAuth = false

  const { Dashboard } = AppRoutes

  if (!isAuth) return <Navigate to={Dashboard.Home} />

  return <>{children}</>
}
