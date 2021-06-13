import _ from 'lodash'
import ClassCoverageType from './ClassCoverageType'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

export default function getClassCoverage({ userSubscriptions, changeStatus, bookingId }) {
    const [hidden, setHidden] = useState(true)

    const loop = (object, coverageType, innerText) => {
        return object.map((coverage) => {
            // turns "1 entrences" to "1 entrence" 
            if (+coverage.remained_entrences === 1) {
                innerText = innerText.slice(0, -1)
            }

            return <ClassCoverageType
                coverage={coverage}
                coverageType={coverageType}
                changeStatus={changeStatus}
                bookingId={bookingId}
                innerText={innerText}
            />
        })
    }

    const renderCoverage = (coverageType, innerText) => {
        return userSubscriptions.map((coverage) => {
            if (coverage[coverageType]) {
                return loop(coverage[coverageType], coverageType, innerText)
            }
            return null
        })
    }

    return (
        <>
            <div className="class-coverage-arrow" onClick={() => setHidden(!hidden)}>
                <p>Subscriptions</p>
                <FontAwesomeIcon icon={hidden ? faChevronRight : faChevronDown} size='1x' />
            </div>
            <div className="class-coverage" style={{ display: hidden ? 'none' : 'block' }}>
                {renderCoverage('entrences', 'entrences')}
                {renderCoverage('free_entrences', 'free entrences')}
                {renderCoverage('discounts', 'discount')}
            </div>
        </>
    )
}
