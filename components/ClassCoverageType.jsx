import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import db from '../db'

export default function ClassCoverageType({ coverage, coverageType, changeStatus, bookingId, innerText }) {
    const [hovered, setIsHover] = useState(false)
    const { remained_entrences, subscription_name, user_subscription_id, amount } = coverage

    const decreaseCoverage = () => {
        const yes = confirm(`Are you sure you want to decrease the amount of ${innerText}?`)
        if (yes) {
            db.subscriptions.decreaseCoverage(coverageType, coverage.id).then((res) => {
                console.log(`remained ${coverageType} : `, res.data)
                changeStatus('present', bookingId)
            })
        }
    }

    return (
        <div
            style={{ display: "flex" }}
            key={user_subscription_id}
            onMouseLeave={coverageType === 'discounts' ? null : () => setIsHover(false)}
            onMouseEnter={coverageType === 'discounts' ? null : () => setIsHover(true)}
            onClick={coverageType === 'discounts' ? null : decreaseCoverage}>
            {hovered ? <span><FontAwesomeIcon style={{ color: '#5E54AC' }} icon={faMinus} size="1x" /></span> : null}
            <p
                style={{ cursor: coverageType === 'discounts' ? '' : 'pointer' }}
                className="converage-desc"> <b>{remained_entrences || amount}{coverageType === 'discounts' ? '%' : ''}</b> {innerText} <br /><i> {subscription_name}</i>
            </p>
        </div>
    )
}
