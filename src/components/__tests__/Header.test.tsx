import { render, screen, fireEvent } from '@testing-library/react'
import Header from '@/components/Header'

describe('Header component', () => {
  it('renders correctly', () => {
    render(<Header />)
    expect(screen.getByText('NFTs')).toBeInTheDocument()
  })

  it('handles search input change correctly', () => {
    render(<Header />)
    const input = screen.getByPlaceholderText(
      'Search nft name'
    ) as HTMLInputElement
    fireEvent.change(input, { target: { value: 'CryptoPunks' } })
    expect(input.value).toBe('CryptoPunks')
  })
})
