import DayScheduleCard from '../components/DayScheduleCard'
import Layout from '../components/Layout'
import { DateRange } from 'react-date-range'
import { useEffect, useState } from 'react/cjs/react.development'
import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css' // theme css file
import Image from 'next/image'
import db from '../db.js'
import { useSession } from 'next-auth/client'

export default function WeekSchedule() {
  const [session, loading] = useSession()
  const [userData, setUserData] = useState(null)
  const [weekSchedule, setWeekSchedule] = useState([])
  const [userBookings, setUserBookings] = useState({})
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      key: 'selection',
    },
  ])

  const updateWeekData = () => {
    
  }

  const updateUserData = () =>
    db.users.queryUsers('email', session.user.email).then((res) => {
      const user = res.data

      setUserData(user)

      let userBookingsMap = user.bookingIds.reduce((map, bookingId) => {
        map[bookingId] = true
        return map
      }, {})
      
      setUserBookings(userBookingsMap)
    })

  useEffect(() => {
    if (session) updateUserData()
  }, [session])

  useEffect(() => {
    db.schedules.getLatestSchedule().then((res) => {
      console.log(res.data)
      setWeekSchedule(res.data)

      let startDate = new Date(res.data[0].dateWeekStart)
      let endDate = new Date(res.data[0].dateWeekEnd)

      setDate([
        {
          startDate: startDate,
          endDate: endDate,
          key: 'selection',
        },
      ])
    })
  }, [])

  const getDayScheduleCards = () => {
    return weekSchedule.map((daySchedule, idx) => {
      return (
        <DayScheduleCard
          key={idx}
          dayData={daySchedule}
          userData={userData}
          userBookings={userBookings}
          updateUserData={updateUserData}
          updateWeekData={updateWeekData}
        />
      )
    })
  }

  return (
    <Layout activeTab={'week_schedule'}>
      <div className='date-container'>
        <div className='wrapper'>
          <DateRange
            className='dateRange'
            editableDateInputs={true}
            showPreview={false}
            showSelectionPreview={false}
            moveRangeOnFirstSelection={true}
            focusedRange={[0, 0]}
            minDate={date[0].startDate}
            maxDate={date[0].endDate}
            moveRangeOnFirstSelection={true}
            dragSelectionEnabled={false}
            ranges={date}
          />
          <div>
            <Image
              src='/assets/yoga_img2.png'
              alt=''
              width={430}
              height={300}
            />
          </div>
        </div>
      </div>
      <div className='day-schedule-cards'>{getDayScheduleCards()}</div>
    </Layout>
  )
}
