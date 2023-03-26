import React from 'react'
import { render } from '@testing-library/react'
import Loader from '@/components/Loader'

describe('Loader', () => {
  it('renders the spinner icon and "Loading..." text', () => {
    const { getByRole, getByText } = render(<Loader />)

    // Check that the spinner icon is displayed
    const spinner = getByRole('status')
    expect(spinner).toBeInTheDocument()

    // Check that the "Loading..." text is displayed
    const loadingText = getByText('Loading...')
    expect(loadingText).toBeInTheDocument()
  })
})
