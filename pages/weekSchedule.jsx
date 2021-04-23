import Head from 'next/head'
import Link from 'next/link'
import DayScheduleCard from '../components/DayScheduleCard'
import Layout from '../components/Layout'
import { DateRange } from 'react-date-range';
import { useEffect, useState } from 'react/cjs/react.development';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import Image from 'next/image';
import db from '../db.js'
import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'

export default function WeekSchedule() {
  const [session, loading] = useSession()
  const [schedule, setSchedule] = useState([]);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      key: 'selection'
    }
  ]);
  const [user, setUser] = useState(null)

  const updateUser = () => db.queryUsers('email', session.user.email).then(res => {
    setUser(res.data)
    console.log('USER UPDATE')
  })

  useEffect(() => {
    if (session) updateUser()
  }, [session])

  useEffect(() => {
    db.schedules.getLatestSchedule().then((res) => {
      setSchedule(res.data)
      console.log(schedule)

      let startDate = new Date(res.data[0].dateWeekStart)
      let endDate = new Date(res.data[0].dateWeekEnd)

      setDate([{
        startDate: startDate,
        endDate: endDate,
        key: 'selection'
      }])
    })
  }, [])

  useEffect(() => {
    let startDate = convertToISODate(date[0].startDate)
    let endDate = convertToISODate(date[0].endDate)

    db.schedules.getSchedule(startDate, endDate).then(res => {
      setSchedule(res.data)
    })
  }, [date])

  const convertToISODate = (date => {
    return date.toLocaleDateString("sv", { timeZone: 'EET' })
  })

  const getDayScheduleCards = () => {
    return schedule.map((daySchedule, idx) => {
      return <DayScheduleCard
        key={idx}
        dayData={daySchedule}
        userData={user}
        updateUserData={updateUser}
      />
    })
  }

  return (
    <Layout activeTab={"week_schedule"}>
      <div className="date-container">
        <div className="wrapper">
          <DateRange
            className="dateRange"
            editableDateInputs={true}
            showPreview={false}
            showSelectionPreview={false}
            moveRangeOnFirstSelection={true}
            focusedRange={[0, 0]}
            onChange={item => {
              let weekStart = item.selection.startDate
              let weekEnd = new Date(weekStart.getTime() + 6 * 24 * 60 * 60 * 1000)

              item.selection.endDate = weekEnd

              setDate([item.selection])
            }}
            moveRangeOnFirstSelection={true}
            dragSelectionEnabled={false}
            ranges={date}
          />
          <div>
            <Image
              src="/assets/yoga_img2.png"
              alt=""
              width={430}
              height={300}
            />
          </div>
        </div>
      </div>
      <div className="day-schedule-cards">
        {getDayScheduleCards()}
      </div>
    </Layout>
  )
}
