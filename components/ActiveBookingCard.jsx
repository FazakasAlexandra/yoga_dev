export default function ActiveBookingCard({ history }) {
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
        <button>Present</button>
        <button>Absent</button>
      </div>
    </div>
  )
}
