import { create } from 'zustand'
import { NFTCollection } from '@/types'
import Fuse from 'fuse.js'
import debounce from 'lodash.debounce'

const fuseOptions = {
  keys: ['title'],
  threshold: 0.3,
}

type NftsState = {
  nfts: NFTCollection[]
  fuse: Fuse<NFTCollection>
  searchQuery: string
  setSearchQuery: (query: string) => void
  searchResults: NFTCollection[]
  setNfts: (data: NFTCollection[]) => void
  setSearchResults: (results: NFTCollection[]) => void
  search: (query: string) => void
}

const useNftStore = create<NftsState>((set, get) => ({
  nfts: [],
  fuse: new Fuse([], { keys: [] }),
  searchQuery: '',
  searchResults: [],
  setSearchQuery: (query) => set({ searchQuery: query }),
  filteredNfts: [],
  setSearchResults: (results) => set({ searchResults: results }),
  setNfts: (nfts) => {
    const fuse = new Fuse(nfts, fuseOptions)
    set({ nfts, fuse })
  },
  search: debounce((query: string) => {
    const { fuse } = useNftStore.getState()
    const results = fuse.search(query) as Fuse.FuseResult<NFTCollection>[]
    const searchResults = results.map((result) => result.item)
    useNftStore.getState().setSearchResults(searchResults)
  }, 200),
}))

export default useNftStore
