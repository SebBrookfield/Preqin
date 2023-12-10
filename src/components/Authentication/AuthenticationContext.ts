import { createContext } from 'react'

type AuthenticationContext = {
  isAuthenticated: boolean
  setIsAuthenticated: (loggedIn: boolean) => void
  authenticationError: string | undefined
  setAuthenticationError: (error: string | undefined) => void
}

export const AuthenticationContext = createContext<AuthenticationContext>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  authenticationError: undefined,
  setAuthenticationError: () => {}
})
