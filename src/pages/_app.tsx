import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { DefaultSeo } from 'next-seo'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo
        title="NFT collection"
        description="A collection of NFTs on Solana."
        openGraph={{
          url: 'https://my-playlist-mauve.vercel.app/',
          type: 'website',
          locale: 'en_IE',
          siteName: 'NFT collection',
          images: [
            {
              url: 'https://tpc.googlesyndication.com/simgad/11695534332434165769',
              width: 800,
              height: 600,
              alt: 'NFT collection',
              type: 'image/jpeg',
            },
          ],
        }}
      />
      <Component {...pageProps} />
    </>
  )
}
