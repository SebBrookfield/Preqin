import { useContext } from 'react'
import { AuthenticationContext } from './AuthenticationContext'
import { authenticateUser } from './authenticateUser'

type UseAuthentication = {
  isAuthenticated: boolean
  authenticateUser: (
    username: string,
    password: string
  ) => Promise<[boolean, string | undefined]>
}

export const useAuthentication = (): UseAuthentication => {
  const { authenticated, setAuthenticated } = useContext(AuthenticationContext)

  return {
    isAuthenticated: authenticated,
    authenticateUser: (username: string, password: string) =>
      authenticateUser(username, password, setAuthenticated)
  }
}
