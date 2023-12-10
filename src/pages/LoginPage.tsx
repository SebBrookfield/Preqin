import React, { FC } from 'react'
import { Container } from '@mui/material'
import { BasePage } from './BasePage'
import { Login } from '../components/Login'

export const LoginPage: FC = () => {
  return (
    <BasePage>
      <Container>
        <Login />
      </Container>
    </BasePage>
  )
}
