import { useContext } from 'react'
import { AuthenticationContext } from './AuthenticationContext'
import { useNavigate } from 'react-router-dom'

type UseAuthentication = {
  isAuthenticated: boolean
  authenticationError: string | undefined
  authenticateUser: (username: string, password: string) => void
}

export const useAuthentication = (): UseAuthentication => {
  const navigate = useNavigate()

  const {
    isAuthenticated,
    authenticationError,
    setIsAuthenticated,
    setAuthenticationError
  } = useContext(AuthenticationContext)

  const fakeAuthenticateUser = (username: string, password: string) => {
    const error =
      username === 'dummydatafeeds@preqin.com' && password === 'dummy'
        ? undefined
        : 'Incorrect username and/or password.'

    setIsAuthenticated(!error)
    setAuthenticationError(error)

    if (!error) {
      navigate('/')
    }
  }

  return {
    isAuthenticated,
    authenticationError,
    authenticateUser: fakeAuthenticateUser
  }
}
