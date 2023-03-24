import MainContainer from '@/components/MainContainer'
import axios from 'axios'
import useSWR from 'swr'
import { useEffect } from 'react'
import Loader from '@/components/Loader'
import useNftStore from '@/store/store'

const fetcher = (url: string) => axios.get(url)

export default function Home() {
  const setNfts = useNftStore((state) => state.setNfts)
  const { data, error, isLoading } = useSWR('/api/nfts', fetcher)

  useEffect(() => {
    if (data) {
      setNfts(data.data)
    }
  }, [data, setNfts])

  if (isLoading) {
    return <Loader />
  }

  return (
    <>
      {error ? (
        <div className="text-white mt-4 text-center">
          Error loading collections.
        </div>
      ) : (
        <MainContainer />
      )}
    </>
  )
}
