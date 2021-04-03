import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Yoga</title>
        <link rel="icon" href="/assets/yogalogo.png" />
      </Head>
      <h1>Yoga home page here !</h1>
      <p>pages/index.js is our homepage</p>
      <Link href="/weekSchedule"><a href="#">link to pages/weekSchedule</a></Link>
    </div>
  )
}
