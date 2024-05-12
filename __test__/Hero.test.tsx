import Hero from '@/app/_components/Hero'
import { COMMON_PATH } from '@/constants/path'
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
      expect(screen.getByText('Men')).toBeInTheDocument()
      expect(screen.getByText('Women')).toBeInTheDocument()
      expect(screen.getByText('Teens')).toBeInTheDocument()
    })

    it('링크가 정확하게 이동해야 함', () => {
      render(<Hero />)
      expect(screen.getByRole('link', { name: 'Men' })).toHaveAttribute(
        'href',
        COMMON_PATH.CATEGORY_MEN,
      )
      expect(screen.getByRole('link', { name: 'Women' })).toHaveAttribute(
        'href',
        COMMON_PATH.CATEGORY_WOMEN,
      )
      expect(screen.getByRole('link', { name: 'Teens' })).toHaveAttribute(
        'href',
        COMMON_PATH.CATEGORY_TEENS,
      )
    })
  })
})
