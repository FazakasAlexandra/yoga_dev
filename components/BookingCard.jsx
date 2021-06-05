import Link from 'next/link'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus } from '@fortawesome/free-solid-svg-icons'

export default function BookingCard({ booking }) {

    const loop = (object, text, event = false) => {
        console.log(object)
        const [isHover, setIsHover] = useState(false)

        return object.map(({ remained_entrences, subscription_name, user_subscription_id }, idx) => {
            return <div
                style={{display: "flex"}}
                key={user_subscription_id}
                onMouseLeave={text === 'discount' ? null : () => setIsHover(false)}
                onMouseEnter={text === 'discount' ? null : () => setIsHover(true)}
                onClick={text === 'discount' ? null : () => {
                    const yes = confirm(`Are you sure you want to decrease the amount of ${text}?`)
                    if(yes){
                        console.log('decrease me ', object[idx])
                    }
                }}>
                {isHover ? <span><FontAwesomeIcon style={{color:'#5E54AC'}}icon={faMinus} size="l" /></span> : null}
                <p
                    style={{cursor : text === 'discount' ? '' : 'pointer'}}
                    className="converage-desc"> <b>{remained_entrences}{text === 'discount' ? '%' : ''}</b> {text} <br /><i> {subscription_name}</i>
                </p>
            </div>
        })
    }

    const getClassCoverage = () => {
        return booking.user_subscriptions.map(({ free_entrences, entrences, discount }) => {
            if (free_entrences) return loop(free_entrences, 'free entrences')
            if (discount) return loop(discount, 'discount')
            if (entrences) return loop(entrences, 'entrences')

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
