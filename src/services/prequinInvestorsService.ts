import { basePrequinService } from './basePrequinService'
import { Investor } from './types/investor'
import { ApiResponse } from './types/apiResponse'
import { Commitment } from './types/commitment'

const getInvestorsByFirmId = async (
  firmId: string | string[]
): Promise<Investor[]> => {
  const firmIds = typeof firmId === 'string' ? firmId : firmId.join(',')
  const response = await basePrequinService.get<ApiResponse<Investor[]>>(
    `/api/Investor?FirmID=${firmIds}`
  )

  return response?.data || []
}

const getCommitments = async (
  assetClass: string,
  investorId: string
): Promise<Commitment[] | undefined> => {
  const response = await basePrequinService.get<ApiResponse<Commitment[]>>(
    `/api/Investor/commitment/${assetClass}/${investorId}`
  )

  return response?.data
}

export const investorsService = {
  getInvestorsByFirmId,
  getCommitments
}
