import Hero from '@/app/_components/Hero'
import { render, screen } from '@testing-library/react'

describe('Hero Component', () => {
  describe('Rendering', () => {
    it('should have text', () => {
      render(<Hero />)
      expect(
        screen.getByText('Top Fashion for a top price!'),
      ).toBeInTheDocument()
      expect(
        screen.getByText(
          'We sell only the most exclusive and high quality products for you. We are the best so come and shop with us.',
        ),
      ).toBeInTheDocument()
    })
  })
})
