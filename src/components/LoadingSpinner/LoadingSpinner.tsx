import React, { FC } from 'react'
import styled, { keyframes } from 'styled-components'
import { Box, BoxProps } from '@mui/material'
import { IconLoading } from './IconLoading'

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

const StyledBox = styled(Box)`
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
`

const StyledIcon = styled(IconLoading)`
  animation: ${spin} 1s linear infinite;
  max-width: 100%;
  max-height: 100%;
`

export const LoadingSpinner: FC<BoxProps> = props => (
  <StyledBox {...props}>
    <StyledIcon />
  </StyledBox>
)
