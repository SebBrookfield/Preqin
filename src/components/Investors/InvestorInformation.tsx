import React, { FC } from 'react'
import { Commitment, Investor } from '../../services'
import {
  Box,
  FormControl,
  InputLabel,
  Typography,
  Select,
  MenuItem,
  SelectChangeEvent,
  Button
} from '@mui/material'
import { investorsService } from '../../services/preqinInvestorsService'
import { toKvp } from '../../utils/kvp'
import { camelCaseToSentenceCase } from '../../utils/toSentenceCase'
import { Label } from '../Label'
import { InformationBox } from '../InformationBox'
import { CommitmentsGrid } from './CommitmentsGrid'
import { ArrowBack } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

type InvestorPanelProps = {
  investor: Investor
}

export const InvestorInformation: FC<InvestorPanelProps> = ({ investor }) => {
  const navigate = useNavigate()

  const kvp = toKvp(investor, [
    'firmID',
    'firmName',
    'region',
    'address',
    'city',
    'stateCounty',
    'zipCode',
    'country',
    'website',
    'email',
    'tel',
    'fax',
    'generalConsultant',
    'localLanguageFirmName',
    'secondaryLocations',
    'firmType',
    'yearEst',
    'investorCurrency'
  ])

  const [assetClass, setAssetClass] = React.useState('')
  const [commitmentsLoading, setCommitmentsLoading] = React.useState(false)
  const [commitments, setCommitments] = React.useState<Commitment[]>()

  const assetClassChanged = (event: SelectChangeEvent) => {
    const ac = event.target.value
    setAssetClass(ac)
    setCommitmentsLoading(true)
    investorsService.getCommitments(ac, investor.firmID).then(c => {
      setCommitments(c)
      setCommitmentsLoading(false)
    })
  }

  return (
    <Box display={'flex'} flexDirection={'column'} gap={3}>
      <Box display={'flex'}>
        <Typography component="h1" variant="h5" flexGrow={1}>
          {investor.firmName}
        </Typography>
        <Button onClick={() => navigate(-1)}>
          <ArrowBack />
        </Button>
      </Box>

      <InformationBox>
        {kvp
          .filter(([_, value]) => !!value)
          .map(([key, value]) => (
            <Label
              key={key}
              id={key}
              label={camelCaseToSentenceCase(key)}
              width={'250px'}
            >
              {value}
            </Label>
          ))}
      </InformationBox>

      <FormControl fullWidth>
        <InputLabel>Asset Class</InputLabel>
        <Select
          id="assetClasses"
          value={assetClass}
          label="Asset Class"
          onChange={assetClassChanged}
        >
          <MenuItem value={'PE'}>Private Equity</MenuItem>
          <MenuItem value={'PD'}>Private Debt</MenuItem>
          <MenuItem value={'RE'}>Real Estate</MenuItem>
          <MenuItem value={'INF'}>Infrastructure</MenuItem>
          <MenuItem value={'NR'}>Natural Resources</MenuItem>
          <MenuItem value={'HF'}>Hedge Funds</MenuItem>
        </Select>
      </FormControl>

      {(commitments || commitmentsLoading) && (
        <Box
          height={'500px'}
          border={1}
          borderRadius={1}
          borderColor={'grey.400'}
          overflow={'hidden'}
        >
          <CommitmentsGrid
            loading={commitmentsLoading}
            commitments={commitments}
          />
        </Box>
      )}
    </Box>
  )
}
