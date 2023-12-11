import React, { FC } from 'react'
import { Commitment } from '../../services'
import { Box, TextField } from '@mui/material'
import { toKvp } from '../../utils/kvp'

type CommitmentsProps = {
  commitments: Commitment[]
}

export const Commitments: FC<CommitmentsProps> = ({ commitments }) => (
  <Box display={'flex'} flexDirection={'column'} width={'100%'}>
    {commitments.map(commitment => {
      return (
        <Box
          display={'flex'}
          flexDirection={'column'}
          sx={{
            mt: 2,
            p: 2,
            border: 1,
            borderColor: 'grey.500',
            borderRadius: '8px',
            height: 'auto'
          }}
        >
          {toKvp(commitment).map(([key, value]) => (
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
        </Box>
      )
    })}
  </Box>
)
