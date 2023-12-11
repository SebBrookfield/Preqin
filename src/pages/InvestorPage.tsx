import React, { FC, useState } from 'react'
import { Container } from '@mui/material'
import { BasePage } from './BasePage'
import { useParams, Navigate, useLocation } from 'react-router-dom'
import { InvestorInformation } from '../components/Investors'
import { investorsService } from '../services/preqinInvestorsService'

export const InvestorPage: FC = () => {
  const { investorId } = useParams()
  const { state } = useLocation()
  const [investor, setInvestor] = useState(state?.investor)

  if (!investor) {
    investorsService
      .getInvestorsByFirmId(investorId!)
      .then(i => setInvestor(i.pop()))
  }

  return (
    <BasePage>
      <Container sx={{ p: 2 }}>
        {investor && <InvestorInformation investor={investor} />}
        {!investor && <Navigate to={'/'} />}
      </Container>
    </BasePage>
  )
}
