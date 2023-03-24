import * as React from 'react'

const Header: React.FC = () => {
  const [searchString, setSearchString] = React.useState('')
  const handleSearch = () => {}

  return (
    <div className="fixed top-0 z-10 w-full shadow-md sm:px-8 lg:px-20 xl:px-20">
      <header className="bg-black py-2 text-white flex justify-center md:justify-between">
        <div className="flex items-center">
          <h1 className="hidden font-semibold md:block text-3xl lg:text-4xl">
            NFTs
          </h1>
        </div>
        <form onSubmit={handleSearch} className="w-full max-w-sm">
          <div className="flex items-center py-2">
            <input
              className="appearance-none bg-transparent w-full text-white py-2 px-2 leading-tight focus:outline-none border border-gray-400"
              type="text"
              id="nftName"
              name="nftName"
              value={searchString}
              onChange={(e) => setSearchString(e.target.value)}
              placeholder="Search nft name"
            />
          </div>
        </form>
      </header>
    </div>
  )
}

export default Header
