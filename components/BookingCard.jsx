import Link from 'next/link'

export default function BookingCard({ booking }) {
    return (
        <div className="booking-card">
            <div className="active-booking-card">
                <div className="outer-list-wraper">
                    <span className="list-initial">{booking.user_name[0]}</span>
                    <div className="inner-list-wraper">
                        <span className="list-name">{booking.user_name}</span>
                        <i className="list-class-type">{booking.class_type}</i>
                    </div>
                </div>
                <div className="active-bookings-status">
                    <button className="button-green">Present</button>
                    <button>Absent</button>
                </div>
            </div>
        </div>
    )
}
