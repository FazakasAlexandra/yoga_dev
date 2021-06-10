import ClassCoverage from '../components/ClassCoverage'

export default function BookingCard({ booking, changeStatus }) {
    return (
        <div className="booking-card">
            <div className="active-booking-card">
                <div className="wraper">
                    <div className="outer-list-wraper">
                        <span className="list-initial">{booking.user_name[0]}</span>
                        <div className="inner-list-wraper">
                            <span className="list-name">{booking.user_name}</span>
                            <i className="list-class-type">{booking.class_type} class</i>
                        </div>
                    </div>
                    <div className="active-bookings-status">
                        <button className="button-green" onClick={() => changeStatus('present', booking.booking_id)}>Present</button>
                        <button onClick={() => changeStatus('absent', booking.booking_id)}>Absent</button>
                    </div>
                </div>
                <ClassCoverage userSubscriptions={booking.user_subscriptions} changeStatus={changeStatus} bookingId={booking.booking_id}/>
            </div>
        </div>
    )
}
