import React, { FC, ReactNode, useState } from 'react'
import { AuthenticationContext } from './AuthenticationContext'
import { simpleStorageService } from '../../services'

type AuthenticationProviderProps = {
  children: ReactNode
}

export const AuthenticationProvider: FC<AuthenticationProviderProps> = ({
  children
}) => {
  const [authenticated, setAuthenticated] = useState<boolean>(
    !!simpleStorageService.authenticationToken
  )

  return (
    <AuthenticationContext.Provider
      value={{
        authenticated,
        setAuthenticated
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  )
}
