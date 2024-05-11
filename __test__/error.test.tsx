import ErrorStripe from '@/app/stripe/error/page'
import { render, screen } from '@testing-library/react'

describe('Stripe Error Page', () => {
  describe('Rendering', () => {
    it('should have text', () => {
      render(<ErrorStripe />)
      expect(screen.getByText('Something went wrong....')).toBeInTheDocument()
    })
  })
})
