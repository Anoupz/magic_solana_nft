import { create } from 'zustand'
import { NFTCollection } from '@/types'
import Fuse from 'fuse.js'
import debounce from 'lodash.debounce'
import axios from 'axios'
import { getAPiUrl } from '@/constants'

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
  offset: number
  limit: number
  isLoading: boolean
  hasMore: boolean
  loadMoreData: () => void
  setOffset: (offset: number) => void
}

const useNftStore = create<NftsState>((set, get) => ({
  nfts: [],
  fuse: new Fuse([], { keys: [] }),
  searchQuery: '',
  hasMore: true,
  searchResults: [],
  setSearchQuery: (query) => set({ searchQuery: query }),
  filteredNfts: [],
  offset: 0,
  limit: 20,
  isLoading: false,
  loadMoreData: async () => {
    set({ isLoading: true })
    const response = await axios.get(getAPiUrl(get().limit, get().offset))
    if (!response.data.results.length) {
      set({ hasMore: false, isLoading: false })
    } else {
      const newNfts = [...get().nfts, ...response.data.results]
      const newFuse = new Fuse(newNfts, fuseOptions)

      set((state) => ({
        nfts: newNfts,
        fuse: newFuse,
        offset: state.offset + state.limit,
        isLoading: false,
        hasMore: true,
      }))
    }
  },
  setOffset: (offset) => set({ offset }),
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
