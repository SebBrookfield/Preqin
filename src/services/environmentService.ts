type Environment = {
  PREQUIN_API_BASE_URL: string
}

export const internalEnvironmentService = (): Environment => {
  const { REACT_APP_PREQUIN_API_BASE_URL } = process.env

  if (!REACT_APP_PREQUIN_API_BASE_URL) {
    throw new Error('REACT_APP_PREQUIN_API_BASE_URL is not defined.')
  }

  return {
    PREQUIN_API_BASE_URL: REACT_APP_PREQUIN_API_BASE_URL
  }
}

export const environmentService = internalEnvironmentService()
