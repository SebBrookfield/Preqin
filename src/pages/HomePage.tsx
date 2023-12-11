import React, { FC, useState } from 'react'
import { Box, Container } from '@mui/material'
import styled from 'styled-components'
import { InvestorsGrid, InvestorInformation } from '../components/Investors'

const StyledBox = styled(Box)`
  display: flex;
  height: 100%;
`

export const HomePage: FC = () => {
  return (
    <StyledBox>
      <InvestorsGrid filter={{ firmIds: [2670, 2792, 332, 3611] }} />
    </StyledBox>
  )
}
