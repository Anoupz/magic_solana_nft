import React from 'react'
import Header from '@/components/Header'
import ImageCard from '@/components/ImageCard'
import useNftStore from '@/store/store'

const MainContainer: React.FC = () => {
  const nfts = useNftStore((state) => state.nfts)

  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-center w-full flex-1 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 text-center mt-40">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {nfts?.length ? (
            nfts.map((nft, index) => <ImageCard key={index} nft={nft} />)
          ) : (
            <div className="text-white">No collections</div>
          )}
        </div>
      </main>
    </>
  )
}

export default MainContainer
