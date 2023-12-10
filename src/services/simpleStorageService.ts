type ItemKeys = 'authenticationToken'

const getData = <T>(key: ItemKeys): T | undefined => {
  const { data, expires } = JSON.parse(localStorage.getItem(key) || '{}')

  if (expires && new Date(expires) < new Date()) {
    clearData(key)
    return undefined
  }

  return data
}

const getExpiryDate = (expiryInSeconds: number): Date => {
  const date = new Date()
  date.setSeconds(date.getSeconds() + expiryInSeconds)
  return date
}

const storeData = <T>(
  key: ItemKeys,
  data: T,
  expiryInSeconds: number = 0
): void => {
  const expires = expiryInSeconds > 0 ? getExpiryDate(expiryInSeconds) : null
  localStorage.setItem(key, JSON.stringify({ data: data, expires }))
}

const clearData = (key: ItemKeys): void => {
  localStorage.removeItem(key)
}

export const simpleStorageService = {
  get authenticationToken(): string | undefined {
    return getData<string>('authenticationToken')
  },
  set authenticationToken(token: { token: string; expiryInSeconds: number }) {
    storeData<string>('authenticationToken', token.token, token.expiryInSeconds)
  },
  clear: clearData
}
