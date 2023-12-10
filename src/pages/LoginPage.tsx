import React, { FC } from 'react'
import { Button, Container, Typography } from '@mui/material'
import { useAuthentication } from '../components/Authentication'

export const LoginPage: FC = () => {
  const { authenticateUser, isAuthenticated } = useAuthentication()

  return (
    <Container>
      <Typography>Login</Typography>
      <Button
        onClick={() => authenticateUser('dummydatafeeds@preqin.com', 'dummy')}
      >
        Log in
      </Button>
    </Container>
  )
}
