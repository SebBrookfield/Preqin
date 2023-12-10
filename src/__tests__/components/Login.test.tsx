import { render, screen, fireEvent } from '@testing-library/react'
import React from 'react'
import { Login } from '../../components/Login'

const mockedNavigate = jest.fn()
const mockedAuthenticateUser = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate
}))

jest.mock('../../components/Authentication', () => ({
  ...jest.requireActual('../../components/Authentication'),
  useAuthentication: () => ({
    authenticateUser: mockedAuthenticateUser
  })
}))

describe('Login tests', () => {
  it('has a the correct login form components', () => {
    render(<Login />)
    const usernameField = screen.getByTestId('email')
    const passwordField = screen.getByTestId('password')
    const submitButton = screen.getByTestId('submit')

    expect(usernameField).toBeInTheDocument()
    expect(passwordField).toBeInTheDocument()
    expect(submitButton).toBeInTheDocument()
  })

  it('calls authenticateUser with the correct credentials', () => {
    const username = 'username1'
    const password = 'password1'
    mockedAuthenticateUser.mockReturnValue(Promise.resolve([true, undefined]))

    render(<Login />)

    const usernameField = screen.getByTestId('email').querySelector('input')!
    fireEvent.change(usernameField, { target: { value: username } })

    const passwordField = screen.getByTestId('password').querySelector('input')!
    fireEvent.change(passwordField, { target: { value: password } })

    const submitButton = screen.getByTestId('submit')
    fireEvent.click(submitButton)

    expect(mockedAuthenticateUser).toBeCalledWith(username, password)
  })
})
