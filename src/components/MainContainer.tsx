import React from 'react'
import Header from '@/components/Header'
import ImageCard from '@/components/ImageCard'
import useNftStore from '@/store/store'

const MainContainer: React.FC = () => {
  const { nfts, searchResults } = useNftStore((state) => ({
    nfts: state.nfts,
    searchResults: state.searchResults,
  }))

  const filteredNfts = searchResults.length ? searchResults : nfts

  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-center w-full flex-1 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 text-center mt-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredNfts?.length ? (
            filteredNfts.map((nft, index) => (
              <ImageCard key={index} nft={nft} />
            ))
          ) : (
            <div className="text-white">No collections</div>
          )}
        </div>
      </main>
    </>
  )
}

export default MainContainer
