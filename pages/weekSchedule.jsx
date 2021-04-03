import Head from 'next/head'
import Link from 'next/link'
import DayScheduleCard from '../components/DayScheduleCard'

export default function Home() {
  return (
    <div className="week-schedule page">
      <Head>
        <title>Yoga</title>
        <link rel="icon" href="/assets/yogalogo.png" />
      </Head>
      <h1>week schedule page here !</h1>

      <div className="day-schedule-cards">
        <DayScheduleCard
          day="Monday"
          src="flowerdesign1.png"
        />
        <DayScheduleCard
          day="Tuesday"
          src="flowerdesign2.png"
        />
      </div>
      
      <Link href="/"><a>link to pages/index</a></Link>
    </div>
  )
}
