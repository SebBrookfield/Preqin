import React, { FC } from 'react'
import { Grid } from '../Grid'
import { Commitment } from '../../services'

type CommitmentsGridProps = {
  commitments: Commitment[] | undefined
  loading: boolean
}

const commitmentColumns = [
  'fundId',
  'fundName',
  'fundManagerId',
  'fundManagerName',
  'fundCurrency',
  'fundSizeMn',
  'committedMn',
  'vintage',
  'fundType',
  'coreIndustries',
  'industryVerticals',
  'domicile',
  'benchmarkLocations',
  'managerExperience'
].map(c => ({
  field: c
}))

export const CommitmentsGrid: FC<CommitmentsGridProps> = ({
  commitments,
  loading
}) => (
  <Grid
    rowData={commitments}
    loading={loading}
    columnDefs={commitmentColumns}
  />
)
