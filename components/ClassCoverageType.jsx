import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import db from '../db'

export default function ClassCoverageType({ coverage, coverageType, changeStatus, bookingId }) {
    const [hovered, setIsHover] = useState(false)
    const { remained_entrences, subscription_name, user_subscription_id } = coverage

    const decreaseCoverage = () => {
        const yes = confirm(`Are you sure you want to decrease the amount of ${coverageType}?`)
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
            onMouseLeave={coverageType === 'discount' ? null : () => setIsHover(false)}
            onMouseEnter={coverageType === 'discount' ? null : () => setIsHover(true)}
            onClick={coverageType === 'discount' ? null : decreaseCoverage}>
            {hovered ? <span><FontAwesomeIcon style={{ color: '#5E54AC' }} icon={faMinus} size="1x" /></span> : null}
            <p
                style={{ cursor: coverageType === 'discount' ? '' : 'pointer' }}
                className="converage-desc"> <b>{remained_entrences}{coverageType === 'discount' ? '%' : ''}</b> {coverageType} <br /><i> {subscription_name}</i>
            </p>
        </div>
    )
}
