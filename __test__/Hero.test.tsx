import Hero from '@/app/_components/Hero'
import { render, screen } from '@testing-library/react'

describe('Hero Component', () => {
  describe('Rendering', () => {
    it('should have text', () => {
      render(<Hero />)
      expect(screen.getByText('Something went wrong....')).toBeInTheDocument()
    })
  })
})
