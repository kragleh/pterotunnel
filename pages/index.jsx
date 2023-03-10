import Footer from '@/components/Footer'
import Header from '@/components/Header'
import ServerList from '@/components/ServerList'
import Head from 'next/head'

export default function Home() {

  return (
    <>
      <Head>
        <title>PteroTunnel</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main>
        <Header />
        <ServerList />
        <Footer />
      </main>
    </>
  )
}
