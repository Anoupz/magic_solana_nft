import { NFTCollection } from '@/types'
import Image from 'next/image'
import { CSSProperties } from 'react'

interface ImageCardProps {
  nft: NFTCollection
  style?: CSSProperties
}

export default function ImageCard({ nft, style }: ImageCardProps) {
  return (
    <div
      className="aspect-w-16 aspect-h-9 relative max-w-sm rounded overflow-hidden shadow-lg m-4 bg-black text-white h-360"
      style={style}
    >
      <div className="after:content group relative mb-5 block w-full after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight object-cover">
        <Image
          src={nft.extra.img}
          alt="Okay Bear"
          className="transform rounded-lg brightness-90 transition will-change-auto group-hover:brightness-110"
          width={720}
          height={480}
          sizes="(max-width: 640px) 100vw,
                  (max-width: 1280px) 50vw,
                  (max-width: 1536px) 33vw,
                  25vw"
        />
      </div>
      <div className="px-6 py-3 relative">
        <h3 className="font-semibold absolute bottom-1 left-1 text-white">
          Okay Bear
        </h3>
        <div className="absolute bottom-1 right-1 text-white">
          <div className="flex gap-2">
            <Image
              src="/solana-sol-logo.svg"
              height={15}
              width={15}
              alt={'logo'}
            />
            {nft.price}
          </div>
        </div>
      </div>
    </div>
  )
}
