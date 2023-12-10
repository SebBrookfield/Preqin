import React, { ReactElement } from 'react'
import { useAuthentication } from './useAuthentication'
import { Navigate } from 'react-router-dom'

export const ProtectedRoute = ({
  element
}: {
  element: ReactElement
}): ReactElement => {
  const { isAuthenticated } = useAuthentication()
  return <>{isAuthenticated ? element : <Navigate to="/login" />}</>
}
