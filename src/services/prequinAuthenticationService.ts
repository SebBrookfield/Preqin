import { basePrequinService } from './basePrequinService'
import { AccessToken } from './types/accessToken'

const authenticateUser = async (
  username: string,
  password: string
): Promise<Partial<Pick<AccessToken, 'access_token' | 'expires_in'>>> => {
  const tokenResponse = await basePrequinService.postEncoded<AccessToken>(
    '/connect/token',
    { username, apiKey: password }
  )

  return {
    access_token: tokenResponse?.access_token,
    expires_in: tokenResponse?.expires_in
  }
}

export const authenticationService = {
  authenticateUser
}
