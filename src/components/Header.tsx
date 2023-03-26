import React, { useState } from 'react'
import useNftStore from '@/store/store'
import { FaSearch, FaTimes } from 'react-icons/fa'

const Header: React.FC = () => {
  const search = useNftStore((state) => state.search)

  const [searchString, setSearchString] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setSearchString(e.target.value)
    search(e.target.value)
    setIsLoading(false)
  }

  const handleClear = () => {
    setSearchString('')
    search('')
  }

  return (
    <div className="fixed top-0 z-10 w-full shadow-md px-4 sm:px-8 md:px-16 lg:px-24 xl:px-20">
      <header className="bg-black py-2 text-white flex justify-center md:justify-between">
        <div className="flex items-center">
          <h1 className="hidden font-semibold md:block text-3xl lg:text-4xl">
            NFTs
          </h1>
        </div>
        <form className="w-full max-w-sm">
          <div className="relative flex items-center py-2">
            <input
              className="appearance-none bg-transparent w-full text-white py-2 px-8 leading-tight focus:outline-none border border-gray-400"
              type="text"
              id="nftName"
              name="nftName"
              value={searchString}
              onChange={handleSearch}
              placeholder="Search nft name"
            />
            {isLoading ? (
              <div className="absolute top-0 right-0 h-full flex items-center pr-3">
                <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-6 w-6"></div>
              </div>
            ) : (
              searchString && (
                <button
                  className="absolute top-0 right-0 h-full flex items-center pr-3"
                  onClick={handleClear}
                >
                  <FaTimes className="text-white" />
                </button>
              )
            )}
            <div className="absolute top-0 left-0 h-full flex items-center pl-3">
              <FaSearch className="text-white" />
            </div>
          </div>
        </form>
      </header>
    </div>
  )
}

export default Header
