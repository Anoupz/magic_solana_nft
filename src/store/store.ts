import { create } from 'zustand'
import { NFTCollection } from '@/types'

type NftsState = {
  nfts: NFTCollection[]
  setNfts: (data: NFTCollection[]) => void
}

const useNftStore = create<NftsState>((set) => ({
  nfts: [],
  setNfts: (nfts) => set({ nfts }),
}))

export default useNftStore
