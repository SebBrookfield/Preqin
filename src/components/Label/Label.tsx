import React, { FC } from 'react'
import { Box, BoxProps, Typography } from '@mui/material'

type LabelProps = BoxProps & {
  label: string
}

export const Label: FC<LabelProps> = ({ label, children, ...rest }) => {
  return (
    <Box p={1} {...rest}>
      <Typography variant={'body2'} color={'grey.500'}>
        {label}
      </Typography>
      <Typography variant={'body2'}>{children}</Typography>
    </Box>
  )
}
