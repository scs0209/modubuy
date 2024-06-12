import LoginPage from '@/app/login/page'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const mockHandleLoginClick = jest.fn()
const mockHandleSignupClick = jest.fn()

// jest.mock을 사용하여 모듈을 모의합니다.
jest.mock('@/store/authorStore', () => ({
  useIsSignUpActive: jest.fn(),
  useAuthorActions: () => ({
    handleSignupClick: mockHandleSignupClick,
    handleLoginClick: mockHandleLoginClick, // 생성한 모의 함수를 할당합니다.
  }),
}))

jest.mock('next/navigation', () => jest.requireActual('next-router-mock'))

describe('LoginPage', () => {
  describe('Rendering', () => {
    it('should have Text', () => {
      render(<LoginPage />)
      expect(screen.getByText('Hello, Friend!')).toBeInTheDocument()
      expect(screen.getByText('Welcome Back!')).toBeInTheDocument()
      expect(screen.getByText('Hello, Friend!')).toBeInTheDocument()
      expect(
        screen.getByText(
          'Register with your personal details to use all of site features',
        ),
      ).toBeInTheDocument()
    })
  })

  describe('Button interactions', () => {
    it('should call handleLoginClick when Sign In button is clicked', async () => {
      const { handleLoginClick } =
        require('@/store/authorStore').useAuthorActions()
      render(<LoginPage />)
      const signInBtn = screen.getByText('Sign In')
      await userEvent.click(signInBtn)
      await waitFor(() => {
        expect(handleLoginClick).toHaveBeenCalled()
      })
    })

    it('should call handleSignupClick when Sign Up button is clicked', async () => {
      const { handleSignupClick } =
        require('@/store/authorStore').useAuthorActions()
      render(<LoginPage />)
      const signUpBtn = screen.getByText('Sign Up')
      await userEvent.click(signUpBtn)
      await waitFor(() => {
        expect(handleSignupClick).toHaveBeenCalled()
      })
    })
  })
})
