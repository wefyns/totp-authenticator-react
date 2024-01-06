import React from 'react'
import { Navigate } from 'react-router-dom'

export function GuestRoute({ children }: React.PropsWithChildren): JSX.Element {
  const isAuth = false

  if (isAuth) return <Navigate to="/" />

  return <>{children}</>
}
