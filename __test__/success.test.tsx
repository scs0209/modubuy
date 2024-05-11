import StripeSuccess from '@/app/stripe/success/page'
import { render, screen } from '@testing-library/react'

describe('Stripe Error Page', () => {
  describe('Rendering', () => {
    it('should have text', () => {
      render(<StripeSuccess />)
      expect(screen.getByText('Payment Done!')).toBeInTheDocument()
      expect(
        screen.getByText('Thank you for you purchase We hope you enjoy it'),
      ).toBeInTheDocument()
      expect(screen.getByText('Have a great day!')).toBeInTheDocument()
    })

    it('"Go Back" 링크가 홈으로 이동해야 함', () => {
      render(<StripeSuccess />)
      expect(screen.getByRole('link', { name: 'GO back' })).toHaveAttribute(
        'href',
        '/',
      )
    })
  })
})
