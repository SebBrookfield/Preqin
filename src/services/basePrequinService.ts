import { environmentService } from './environmentService'
import { simpleStorageService } from './simpleStorageService'

type PrequinServiceBase = {
  get: <T>(api: string) => Promise<T>
  post: <T>(api: string, data?: object) => Promise<T>
  postEncoded: <T>(api: string, data: Record<string, string>) => Promise<T>
}

const createUrl = (api: string): string => {
  const baseUrl = environmentService.PREQUIN_API_BASE_URL
  return new URL(api, baseUrl).href
}

const fetchResponse = async <T>(
  api: string,
  method: 'GET' | 'POST',
  body?: string | URLSearchParams
): Promise<T> => {
  const url = createUrl(api)
  const headers: Record<string, string> = {}
  const authenticationToken = simpleStorageService.authenticationToken

  if (!!authenticationToken) {
    headers['Authorization'] = `Bearer ${authenticationToken}`
  }

  const response = await fetch(url, {
    method,
    headers,
    body
  })

  return await response.json()
}

export const basePrequinService: PrequinServiceBase = {
  get: async api => await fetchResponse(api, 'GET'),
  post: async (api, data) =>
    await fetchResponse(api, 'POST', JSON.stringify(data)),
  postEncoded: async (api, data) =>
    await fetchResponse(api, 'POST', new URLSearchParams(data))
}
