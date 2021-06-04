import Link from 'next/link'

export default function BookingCard({ booking, }) {
    const loop = (object, text) => {
        return object.map(({ remained_entrences, subscription_name }) => {
            return <p className="converage-desc"> <b>{remained_entrences}</b> {text} <br/><i> {subscription_name}</i></p>
        })
    }

    const getClassCoverage = () => {
        return booking.user_subscriptions.map(({ free_entrences, entrences, discount }) => {
            if (free_entrences) return loop(free_entrences, 'free entrences')
            if (discount) return loop(discount, 'free entrences')
            if (entrences) return loop(entrences, 'free entrences')

            return null
        })
    }

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
                        <button className="button-green">Present</button>
                        <button>Absent</button>
                    </div>
                </div>
                <div>{getClassCoverage()}</div>

            </div>
        </div>
    )
}
