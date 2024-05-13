import LoginPage from '@/app/login/page'
import { render, screen } from '@testing-library/react'

jest.mock('@/store/authorStore', () => ({
  useIsSignUpActive: jest.fn(),
  useAuthorActions: () => ({
    handleSignupClick: jest.fn(),
    handleLoginClick: jest.fn(),
  }),
}))

jest.mock('next/navigation', () => jest.requireActual('next-router-mock'))

describe('LoginPage', () => {
  // isSignUpActive가 true일 때
  it('should show sign up related text when isSignUpActive is true', () => {
    // useIsSignUpActive가 true를 반환하도록 설정
    require('@/store/authorStore').useIsSignUpActive.mockImplementation(
      () => true,
    )
    render(<LoginPage />)
    expect(screen.getByText('Hello, Friend!')).toBeInTheDocument()
    expect(screen.queryByText('Welcome Back!')).not.toBeInTheDocument()
  })

  // isSignUpActive가 false일 때
  it('should show login related text when isSignUpActive is false', () => {
    // useIsSignUpActive가 false를 반환하도록 설정
    require('@/store/authorStore').useIsSignUpActive.mockImplementation(
      () => false,
    )
    render(<LoginPage />)
    expect(screen.getByText('Welcome Back!')).toBeInTheDocument()
    expect(screen.queryByText('Hello, Friend!')).not.toBeInTheDocument()
  })
})

// describe('LoginPage', () => {
//   describe('Rendering', () => {
//     it('should have Text', () => {
//       render(<LoginPage />)
//       expect(screen.getByText('Welcome Back!')).toBeInTheDocument()
//     })
//   })
// })
