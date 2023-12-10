import { enableFetchMocks, disableFetchMocks } from 'jest-fetch-mock'
import { authenticationService } from '../../services'

describe('authentication service tests', () => {
  beforeEach(() => {
    enableFetchMocks()
  })

  afterEach(() => {
    disableFetchMocks()
  })

  it('should call fetch with the correct parameters', async () => {
    fetchMock.mockOnce(
      JSON.stringify({
        access_token: 'test',
        expires_in: 123
      })
    )

    const username = 'testUser'
    const password = 'testPassword'

    await authenticationService.authenticateUser(username, password)

    expect(fetch).toBeCalledWith('https://api.preqin.com/connect/token', {
      body: new URLSearchParams({ username, apiKey: password }),
      headers: {},
      method: 'POST'
    })
  })

  it('should return the token and expiry correctly', async () => {
    const expectedReturn = {
      access_token: 'test',
      expires_in: 123
    }

    fetchMock.mockOnce(JSON.stringify(expectedReturn))

    const result = await authenticationService.authenticateUser(
      'testUser',
      'testPassword'
    )

    expect(result).toEqual(expectedReturn)
  })
})
