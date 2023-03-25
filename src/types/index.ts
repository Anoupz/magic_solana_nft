export type NFTCollection = {
  mintAddress: string
  title: string
  onChainCollection: {
    data: {
      image: string
      name: string
    }
  }
  price: number
  name: string
}
