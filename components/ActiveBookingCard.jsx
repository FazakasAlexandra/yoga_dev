import db from '../db'
import ClassCoverage from './ClassCoverage'

export default function ActiveBookingCard({
  history,
  buttonVisible,
  reloadClientInfo
}) {

  const changeStatus = (status) => {
    db.getJWT().then(jwt => {
      db.bookings.changeStatus(jwt.jwtToken, history.booking_id, status)
        .then((res) => {
          console.log(res.data)
          reloadClientInfo()
        })
    })
  }

  return (
    <div className='active-booking-card'>
      <div className='wraper'>
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
      <ClassCoverage userSubscriptions={history.user_subscriptions} changeStatus={changeStatus} />
    </div>
  )
}
