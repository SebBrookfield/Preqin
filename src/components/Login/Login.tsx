import React, { FC, useState } from 'react'
import { Avatar, Box, Button, TextField, Typography } from '@mui/material'
import { LockOutlined } from '@mui/icons-material'
import styled from 'styled-components'
import { useAuthentication } from '../Authentication'
import { useNavigate } from 'react-router-dom'

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
`
type OnChangeEvent = React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>

export const Login: FC = () => {
  const { authenticateUser } = useAuthentication()
  const navigate = useNavigate()
  const [username, setUsername] = useState<string>()
  const [password, setPassword] = useState<string>()
  const [usernameError, setUsernameError] = useState<boolean>()
  const [passwordError, setPasswordError] = useState<boolean>()
  const [authenticationError, setAuthenticationError] = useState<string>()

  const submit = async (event: any) => {
    event.preventDefault()

    setUsernameError(!username)
    setPasswordError(!password)

    if (!username || !password) {
      return
    }

    const [isAuthenticated, error] = await authenticateUser(username, password)

    if (isAuthenticated) {
      navigate('/')
    }

    setAuthenticationError(error)
  }

  return (
    <StyledBox>
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlined />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      {authenticationError && (
        <Typography component="h1" variant="h3" color={'red'}>
          {authenticationError}
        </Typography>
      )}
      <Box component="form" onSubmit={submit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          data-testid="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          error={usernameError}
          onChange={(e: OnChangeEvent) => setUsername(e.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          data-testid="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          error={passwordError}
          onChange={(e: OnChangeEvent) => setPassword(e.target.value)}
        />
        <Button
          data-testid="submit"
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
      </Box>
    </StyledBox>
  )
}
