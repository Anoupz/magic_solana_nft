export const getAPiUrl = (limit = 20, offset = 0) =>
  `https://api-mainnet.magiceden.io/idxv2/getListedNftsByCollectionSymbol?collectionSymbol=degods&onChainCollectionAddress=&direction=1&field=2&limit=${limit}&offset=${offset}`
