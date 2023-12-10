import { basePrequinService } from './basePrequinService'
import { Investor } from './types/investor'

const getInvestorsByFirmId = async (
  firmId: string | string[]
): Promise<Investor[]> => {
  const firmIds = typeof firmId === 'string' ? firmId : firmId.join(',')
  const response = await basePrequinService.get<{ data: Investor[] }>(
    `/api/Investor?FirmID=${firmIds}`
  )

  return response.data
}

export const investorsService = {
  getInvestorsByFirmId
}
