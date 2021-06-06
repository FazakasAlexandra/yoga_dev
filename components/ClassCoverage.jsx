
import _ from 'lodash'
import ClassCoverageType from './ClassCoverageType'

export default function getClassCoverage({ userSubscriptions, changeStatus, bookingId }) {
    const loop = (object, coverageType) => {
        return object.map((coverage) => {
            return <ClassCoverageType 
            coverage={coverage} 
            coverageType={coverageType} 
            changeStatus={changeStatus}
            bookingId={bookingId} />
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
        <div className="class-coverage">
            {getClassCoverage('entrences')}
            {getClassCoverage('free_entrences')}
            {getClassCoverage('discount')}
        </div>

    )
}