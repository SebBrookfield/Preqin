import { Box } from '@mui/material'
import { grey } from '@mui/material/colors'
import styled from 'styled-components'

export const InformationBox = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  padding: 8px;
  border: 1px solid ${() => grey[400]};
  border-radius: 4px;
  height: auto;
  gap: 8px;
`
