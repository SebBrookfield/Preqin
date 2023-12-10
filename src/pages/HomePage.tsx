import React, { FC, useState } from 'react'
import { Box, Container } from '@mui/material'
import styled from 'styled-components'
import { InvestorsGrid, InvestorPanel } from '../components/Investors'

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  height: 100%;
`

export const HomePage: FC = () => {
  const [investorId, setInvestorId] = useState<number>()

  return (
    <StyledBox>
      <Box flex={1} height={'100%'}>
        <InvestorsGrid
          filter={{ firmIds: [2670, 2792, 332, 3611] }}
          showInvestorPanelForId={setInvestorId}
        />
      </Box>
      {investorId && (
        <Box flex={1}>
          <InvestorPanel investorId={investorId} />
        </Box>
      )}
    </StyledBox>
  )
}
