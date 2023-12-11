import { environmentService } from './environmentService'
import { simpleStorageService } from './simpleStorageService'

type PrequinServiceBase = {
  get: <T>(api: string) => Promise<T | undefined>
  post: <T>(api: string, data?: object) => Promise<T | undefined>
  postEncoded: <T>(
    api: string,
    data: Record<string, string>
  ) => Promise<T | undefined>
}

const createUrl = (api: string): string => {
  const baseUrl = environmentService.PREQUIN_API_BASE_URL
  return new URL(api, baseUrl).href
}

const fetchResponse = async <T>(
  api: string,
  method: 'GET' | 'POST',
  body?: string | URLSearchParams
): Promise<T | undefined> => {
  const url = createUrl(api)
  const headers: Record<string, string> = {}
  const authenticationToken = simpleStorageService.authenticationToken

  if (!!authenticationToken) {
    headers['Authorization'] = `Bearer ${authenticationToken}`
  }

  try {
    const response = await fetch(url, {
      method,
      headers,
      body
    })

    return await response.json()
  } catch (error: any) {
    console.error(error)
    return undefined
  }
}

export const basePrequinService: PrequinServiceBase = {
  get: async api => await fetchResponse(api, 'GET'),
  post: async (api, data) =>
    await fetchResponse(api, 'POST', JSON.stringify(data)),
  postEncoded: async (api, data) =>
    await fetchResponse(api, 'POST', new URLSearchParams(data))
}
