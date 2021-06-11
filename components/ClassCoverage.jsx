import _ from 'lodash'
import ClassCoverageType from './ClassCoverageType'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

export default function getClassCoverage({
  userSubscriptions,
  changeStatus,
  bookingId,
}) {
  const [hidden, setHidden] = useState(true)

  const loop = (object, coverageType) => {
    return object.map((coverage) => {
      return (
        <ClassCoverageType
          coverage={coverage}
          coverageType={coverageType}
          changeStatus={changeStatus}
          bookingId={bookingId}
        />
      )
    })
  }

  const getClassCoverage = (coverageType) => {
    return userSubscriptions.map((coverage) => {
      if (coverage[coverageType]) {
        return loop(coverage[coverageType], coverageType)
      }
      return null
    })
  }

  return (
    <>
      <div className='class-coverage-arrow' onClick={() => setHidden(!hidden)}>
        <p>Subscriptions</p>
        <FontAwesomeIcon
          icon={hidden ? faChevronRight : faChevronDown}
          size='1x'
        />
      </div>
      <div
        className='class-coverage'
        style={{ display: hidden ? 'none' : 'block' }}
      >
        {getClassCoverage('entrences')}
        {getClassCoverage('free_entrences')}
        {getClassCoverage('discount')}
      </div>
    </>
  )
}
