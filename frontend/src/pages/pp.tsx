import { PrivacyPolicy } from '@/comonents/main/privacy/privacy'
import Head from 'next/head'

const pp = () => {
  return (
    <>
      <Head>
        <title>4hack Policy </title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
        <meta name="description" content={'Our privacy policy'} />
      </Head>
      <PrivacyPolicy />
    </>
  )
}
export default pp
