import React from 'react'
import { render, screen } from '@testing-library/react'
import MainContainer from '@/components/MainContainer'
import useNftStore from '@/store/store'
import Fuse from 'fuse.js'
import userEvent from '@testing-library/user-event'

jest.mock('@/store/store', () => ({
  __esModule: true,
  default: jest.fn(),
}))

describe('MainContainer', () => {
  const mockNfts: any = [
    {
      mintAddress: '1',
      title: 'NFT 1',
      onChainCollection: {
        data: {
          image: 'https://example.com/nft1.jpg',
        },
      },
    },
    {
      mintAddress: '2',
      title: 'NFT 2',
      onChainCollection: {
        data: {
          image: 'https://example.com/nft2.jpg',
        },
      },
    },
  ]
  let mockedUseNftStore: jest.MockedFunction<typeof useNftStore>

  beforeEach(() => {
    mockedUseNftStore = useNftStore as jest.MockedFunction<typeof useNftStore>
    mockedUseNftStore.mockImplementation((selector) =>
      selector({
        nfts: [],
        fuse: new Fuse([], { keys: [] }),
        searchQuery: '',
        setSearchQuery: jest.fn(),
        searchResults: [],
        setNfts: jest.fn(),
        setSearchResults: jest.fn(),
        search: jest.fn(),
      })
    )
  })

  test('renders the header component', () => {
    render(<MainContainer />)
    const headerElement = screen.getByRole('banner')
    expect(headerElement).toBeInTheDocument()
  })

  test('displays NFTs in a grid layout', () => {
    mockedUseNftStore.mockReturnValue({
      nfts: mockNfts,
      fuse: new Fuse([], { keys: [] }),
      searchQuery: '',
      setSearchQuery: jest.fn(),
      searchResults: [],
      setNfts: jest.fn(),
      setSearchResults: jest.fn(),
      search: jest.fn(),
    })
    render(<MainContainer />)
    const nftElements = screen.getAllByRole('img')
    expect(nftElements).toHaveLength(4)
  })

  test('displays "No collections" when there are no NFTs to display', () => {
    jest.mock('@/store/store', () => ({
      useNftStore: jest.fn().mockReturnValue({ nfts: [], searchResults: [] }),
    }))
    render(<MainContainer />)
    const messageElement = screen.getByText('No collections')
    expect(messageElement).toBeInTheDocument()
  })

  test('filters NFTs by search term', () => {
    const mockSearch = [
      {
        mintAddress: '1',
        title: 'NFT 1',
        onChainCollection: {
          data: {
            image: 'https://example.com/nft1.jpg',
          },
        },
      },
      {
        mintAddress: '2',
        title: 'NFT 2',
        onChainCollection: {
          data: {
            image: 'https://example.com/nft2.jpg',
          },
        },
      },
      {
        mintAddress: '3',
        title: 'NFT 3',
        onChainCollection: {
          data: {
            image: 'https://example.com/nft3.jpg',
          },
        },
      },
    ]
    mockedUseNftStore.mockReturnValue({
      nfts: mockNfts,
      fuse: new Fuse([], { keys: [] }),
      searchQuery: '',
      setSearchQuery: jest.fn(),
      searchResults: mockSearch,
      setNfts: jest.fn(),
      setSearchResults: jest.fn(),
      search: jest.fn(),
    })
    render(<MainContainer />)
    const searchInputElement = screen.getByPlaceholderText('Search nft name')
    userEvent.type(searchInputElement, 'NFT 2')
    const nftElements = screen.getAllByRole('img')
    expect(nftElements).toHaveLength(6)
  })
})
