import React, { FC } from 'react'
import { Box, Typography } from '@mui/material'

type InvestorPanelProps = {
  investorId: number
}
export const InvestorPanel: FC<InvestorPanelProps> = ({ investorId }) => {
  return (
    <Box>
      <Typography>{investorId}</Typography>
    </Box>
  )
}
