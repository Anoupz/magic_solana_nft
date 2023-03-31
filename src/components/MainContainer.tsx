import React, { useCallback, useEffect } from 'react'
import Header from '@/components/Header'
import ImageCard from '@/components/ImageCard'
import useNftStore from '@/store/store'
import Loader from '@/components/Loader'

const MainContainer: React.FC = () => {
  const {
    nfts,
    searchResults,
    limit,
    offset,
    loadMoreData,
    isLoading,
    setOffset,
    hasMore,
  } = useNftStore((state) => ({
    nfts: state.nfts,
    searchResults: state.searchResults,
    limit: state.limit,
    offset: state.offset,
    loadMoreData: state.loadMoreData,
    isLoading: state.isLoading,
    setOffset: state.setOffset,
    hasMore: state.hasMore,
  }))

  const handleScroll = useCallback(() => {
    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop
    const scrollHeight =
      (document.documentElement && document.documentElement.scrollHeight) ||
      document.body.scrollHeight
    const clientHeight =
      document.documentElement.clientHeight || window.innerHeight
    if (scrollTop + clientHeight >= scrollHeight - 5 && !isLoading && hasMore) {
      setOffset(offset + limit)
      loadMoreData()
    }
  }, [loadMoreData, hasMore, isLoading, limit, offset, setOffset])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

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
        {isLoading && <Loader />}
      </main>
    </>
  )
}

export default MainContainer
