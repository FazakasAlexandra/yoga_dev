import Head from 'next/head'
import Link from 'next/link'
import DayScheduleCard from '../components/DayScheduleCard'
import Layout from '../components/Layout'
export default function Home() {
  return (
    <Layout activeTab={"week_schedule"}>
      <div className="day-schedule-cards">
        <DayScheduleCard
          day="Monday"
          src="flowerdesign1.png"
        />
        <DayScheduleCard
          day="Tuesday"
          src="flowerdesign2.png"
        />
        <DayScheduleCard
          day="Monday"
          src="flowerdesign1.png"
        />
        <DayScheduleCard
          day="Tuesday"
          src="flowerdesign2.png"
        />
        <DayScheduleCard
          day="Monday"
          src="flowerdesign1.png"
        />
        <DayScheduleCard
          day="Tuesday"
          src="flowerdesign2.png"
        />
        <DayScheduleCard
          day="Monday"
          src="flowerdesign1.png"
        />
      </div>
    </Layout>
  )
}
