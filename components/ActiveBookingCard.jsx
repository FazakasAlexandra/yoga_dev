import { useState, useEffect, useRef } from 'react'
import { useSession } from 'next-auth/client'
import db from '../db'

export default function ActiveBookingCard({
  history,
  userData,
  buttonVisible,
}) {
  //const router = useRouter()
  const [session, loading] = useSession()
  const [bookingStatus, setBookingStatus] = useState()

  useEffect(() => {
    if (!session) router.push({ pathname: '/' })
  }, [session])

  const changeStatus = (id, status) => {
    db.bookings
      .changeStatus(userData, id, status)
      .then((res) => setBookingStatus(res.data))
    window.location.reload()
  }

  return (
    <div className='active-booking-card'>
      <div className='active-bookings-numbers'>
        <p>{history.hour}</p>
        <p>{history.online_price}</p>
      </div>
      <div className='active-bookings-details'>
        <p>{history.day}</p>
        <p>{history.name}</p>
        <p>{history.class_type}</p>
      </div>
      <div className='active-bookings-status'>
        <button
          className='buttonPresent'
          id={buttonVisible}
          onClick={() => changeStatus(history.booking_id, 'present')}
        >
          Present
        </button>
        <button
          className='buttonAbsent'
          id={buttonVisible}
          onClick={() => changeStatus(history.booking_id, 'absent')}
        >
          Absent
        </button>
      </div>
    </div>
  )
}
