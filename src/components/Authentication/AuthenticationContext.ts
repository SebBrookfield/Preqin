import { createContext } from 'react'

type AuthenticationContext = {
  authenticated: boolean
  setAuthenticated: (authenticated: boolean) => void
}

export const AuthenticationContext = createContext<AuthenticationContext>({
  authenticated: false,
  setAuthenticated: () => {}
})
