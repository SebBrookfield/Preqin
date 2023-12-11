import React, { FC } from 'react'
import { Commitment, Investor } from '../../services'
import {
  Box,
  FormControl,
  InputLabel,
  TextField,
  Typography,
  Select,
  MenuItem,
  SelectChangeEvent
} from '@mui/material'
import { LoadingSpinner } from '../LoadingSpinner'
import { investorsService } from '../../services/preqinInvestorsService'
import { toKvp } from '../../utils/kvp'
import { Commitments } from './Commitments'

type InvestorPanelProps = {
  investor: Investor
}

export const InvestorInformation: FC<InvestorPanelProps> = ({ investor }) => {
  const kvp = toKvp(investor, ['region', 'address', 'city'])

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
    <Box display={'flex'} flexDirection={'column'}>
      <Typography component="h1" variant="h5">
        {investor.firmName}
      </Typography>

      {kvp.map(([key, value]) => (
        <TextField
          key={key}
          sx={{ mt: 2 }}
          id={key}
          label={key}
          variant="outlined"
          size={'small'}
          value={value}
        />
      ))}

      <FormControl fullWidth sx={{ mt: 2 }}>
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

      {(commitmentsLoading || commitments) && (
        <Box
          display={'flex'}
          alignItems={'cemter'}
          justifyContent={'center'}
          sx={{
            mt: 2,
            p: 2,
            border: 1,
            borderColor: 'grey.400',
            borderRadius: '8px',
            height: 'auto'
          }}
        >
          {commitmentsLoading && <LoadingSpinner />}
          {!commitmentsLoading && commitments && (
            <Commitments commitments={commitments} />
          )}
        </Box>
      )}
    </Box>
  )
}
