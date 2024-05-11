import { render, screen } from '@testing-library/react'
import NotFound from '@/app/not-found'

describe('NotFound Page', () => {
  describe('Rendering', () => {
    it('should have 404', () => {
      render(<NotFound />)
      expect(screen.getByText('404')).toBeInTheDocument()
      expect(
        screen.getByText('The page you’re looking for doesn’t exist.'),
      ).toBeInTheDocument()
    })

    it('"Go Back" 링크가 홈으로 이동해야 함', () => {
      render(<NotFound />)
      expect(screen.getByRole('link', { name: /go back/i })).toHaveAttribute(
        'href',
        '/',
      )
    })
  })
})
