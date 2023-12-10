import { authenticationService, simpleStorageService } from '../../services'

export const authenticateUser = async (
  username: string,
  password: string,
  setAuthenticated: (authenticated: boolean) => void
): Promise<[boolean, string | undefined]> => {
  try {
    const { access_token, expires_in } =
      await authenticationService.authenticateUser(username, password)

    const error = access_token
      ? undefined
      : 'Incorrect username and/or password.'

    simpleStorageService.authenticationToken = {
      token: access_token,
      expiryInSeconds: expires_in
    }

    setAuthenticated(!!access_token)

    return [!error, error]
  } catch {
    return [false, 'An unknown error occurred.']
  }
}
