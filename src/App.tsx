import React from 'react'
import { ThemeProvider, createTheme, Container } from '@mui/material'
import { BrowserRouter, Routes } from 'react-router-dom'

export default () => {
  const theme = createTheme()
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Container />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}
