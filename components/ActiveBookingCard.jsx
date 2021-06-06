import { useSession } from 'next-auth/client'
import db from '../db'

export default function ActiveBookingCard({
  history,
  buttonVisible,
  reloadClientInfo
}) {
  const [session, loading] = useSession()

  const changeStatus = (status) => {
    db.users.queryUsers('email', session.user.email).then(res => {
      db.bookings.changeStatus(res.data.jwt, history.booking_id, status)
        .then((res) => {
          console.log(res.data)
          reloadClientInfo()
        })
    })
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
          onClick={() => changeStatus('present')}
        >
          Present
        </button>
        <button
          className='buttonAbsent'
          id={buttonVisible}
          onClick={() => changeStatus('absent')}
        >
          Absent
        </button>
      </div>
    </div>
  )
}
