import DayScheduleCard from '../components/DayScheduleCard'
import Layout from '../components/Layout'
import Loader from '../components/Loader'
import { DateRange } from 'react-date-range'
import { useEffect, useState } from 'react/cjs/react.development'
import db from '../db.js'
import { useSession } from 'next-auth/client'

export default function WeekSchedule() {
  const [session, loading] = useSession()
  const [userData, setUserData] = useState(null)
  const [weekSchedule, setWeekSchedule] = useState([])
  const [userBookings, setUserBookings] = useState({})
  const [dataLoading, setDataLoading] = useState(true);

  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      key: 'selection',
    },
  ])

  useEffect(() => {
    if (!loading && !session) {
      console.log('no user')
      console.log(userData)
    }
  }, [session])

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
  const updateWeekData = () => { }

  useEffect(() => {
    if (session) updateUserData()
  }, [session])

  useEffect(() => {
    db.schedules.getLatestSchedule().then(({ data }) => {
      setDataLoading(false)
      
      if (data.length) {
        const sortedSchedule = data.sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        )

        setWeekSchedule(sortedSchedule)

        let startDate = new Date(data[0].dateWeekStart)
        let endDate = new Date(data[0].dateWeekEnd)

        setDate([
          {
            startDate: startDate,
            endDate: endDate,
            key: 'selection',
          },
        ])
      }
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
            editableDateInputs={false}
            focusedRange={[0, 0]}
            minDate={date[0].startDate}
            maxDate={date[0].endDate}
            moveRangeOnFirstSelection={true}
            dragSelectionEnabled={false}
            ranges={date}
            onChange={(e) => console.log('hi')}
            showMonthAndYearPickers={false}
            showMonthArrow={false}
          />
        </div>
      </div>
      {
        dataLoading ? <Loader /> :
          <div className='day-schedule-cards'>
            {
              weekSchedule.length ? getDayScheduleCards() : <h2 className="no-data-txt">NO SCHEDULE AVAILABLE</h2>
            }
          </div>
      }

    </Layout>
  )
}
