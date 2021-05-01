import DayScheduleCard from '../components/DayScheduleCard'
import Layout from '../components/Layout'
import { DateRange } from 'react-date-range';
import { useEffect, useState } from 'react/cjs/react.development';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import Image from 'next/image';
import db from '../db.js'
import { useSession } from 'next-auth/client'

export default function WeekSchedule() {
  const [session, loading] = useSession()
  const [userData, setUserData] = useState(null)
  const [weekSchedule, setWeekSchedule] = useState([]);
  const [userBookings, setUserBookings] = useState({})
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      key: 'selection'
    }
  ]);
  
  const updateUserData = () => db.users.queryUsers('email', session.user.email).then(res => {
    setUserData(res.data)
    let userBookingsMap = res.data.bookingIds.reduce((map, bookingId) => {
      map[bookingId] = true
      return map
    }, {})
    setUserBookings(userBookingsMap)
    console.log('USER UPDATED')
  })

  useEffect(() => {
    if (session) updateUserData()
  }, [session])

  useEffect(() => {
    db.schedules.getLatestSchedule().then((res) => {
      setWeekSchedule(res.data)
      console.log(weekSchedule)

      let startDate = new Date(res.data[0].dateWeekStart)
      let endDate = new Date(res.data[0].dateWeekEnd)

      setDate([{
        startDate: startDate,
        endDate: endDate,
        key: 'selection'
      }])
    })
   //updateUserData()
  }, [])

  useEffect(() => {
    let startDate = convertToISODate(date[0].startDate)
    let endDate = convertToISODate(date[0].endDate)

    db.schedules.getSchedule(startDate, endDate).then(res => {
      setWeekSchedule(res.data)
    })
  }, [date])

  const convertToISODate = (date => {
    return date.toLocaleDateString("sv", { timeZone: 'EET' })
  })

  const getDayScheduleCards = () => {
    return weekSchedule.map((daySchedule, idx) => {
      return <DayScheduleCard
        key={idx}
        dayData={daySchedule}
        userData={userData}
        userBookings={userBookings}
        updateUserData={updateUserData}
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
