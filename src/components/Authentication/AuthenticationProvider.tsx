import React, { FC, ReactNode, useState } from 'react'
import { AuthenticationContext } from './AuthenticationContext'

type AuthenticationProviderProps = {
  children: ReactNode
}

export const AuthenticationProvider: FC<AuthenticationProviderProps> = ({
  children
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authenticationError, setAuthenticationError] = useState<string>()

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        authenticationError,
        setAuthenticationError
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  )
}
