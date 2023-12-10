import React from 'react'
import { ThemeProvider, createTheme } from '@mui/material'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {
  AuthenticationProvider,
  ProtectedRoute
} from './components/Authentication'
import { HomePage } from './pages/HomePage'
import { LoginPage } from './pages/LoginPage'

export default () => {
  const theme = createTheme()
  return (
    <ThemeProvider theme={theme}>
      <AuthenticationProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={<ProtectedRoute element={<HomePage />} />}
            />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </BrowserRouter>
      </AuthenticationProvider>
    </ThemeProvider>
  )
}
