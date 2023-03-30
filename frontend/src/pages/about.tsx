import Navbar, { routes } from '@/comonents/main/main/Header'
import { MobileSideBar } from '@/comonents/main/main/mobileSideBar'
import { postPreviewType, Topics } from '@/types/types'
import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'

const About = () => {
  return (
    <>
      <Head>
        <title>About Us</title>
      </Head>
      <Navbar />
      <MobileSideBar routes={routes} />
      <div className="w-full min-h-screen flex justify-center dark:bg-black bg-neutral-100 font-OpenSans">
        <main
          style={{ maxWidth: '1000px' }}
          className="mt-14 flex flex-col w-full h-min
        bg-white border-neutral-200 border py-3 px-5
        dark:bg-neutral-900 dark:border-neutral-800 rounded-lg
        "
        >
          <h1 className="font-OpenSansBold dark:text-pink-400">
            About:
          </h1>
          <br />
          <h2 className="dark:text-purple-500 text-2xl md:text-3xl text-black font-OpenSansBold">
            Created with Love by{' '}
            <a
              href="https://github.com/lukahukur"
              className="underline text-blue-600"
            >
              #lukahukur
            </a>
          </h2>
          <br />
          <h2 className="dark:text-purple-500 text-2xl md:text-3xl text-black font-OpenSansBold">
            Inspired by Dear{' '}
            <p className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 inline">
              DonKalistrateChad
            </p>
            💪
          </h2>
          <br />
        </main>
      </div>
    </>
  )
}

export default About
