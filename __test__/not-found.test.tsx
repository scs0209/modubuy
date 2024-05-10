import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import NotFound from '@/app/not-found'

describe('NotFound Page', () => {
  describe('Rendering', () => {
    it('should have 404', () => {
      render(<NotFound />)
      expect(screen.getByText('404')).toBeInTheDocument()
    })
  })
})
