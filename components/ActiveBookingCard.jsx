import db from '../db'
import ClassCoverage from './ClassCoverage'

export default function ActiveBookingCard({
  history,
  buttonVisible,
  reloadClientInfo,
  coverageVisible,
  buttonCancel,
}) {
  const changeStatus = (status) => {
    db.getJWT().then((jwt) => {
      db.bookings
        .changeStatus(jwt.jwtToken, history.booking_id, status)
        .then((res) => {
          reloadClientInfo()
        })
    })
  }

  return (
    <div className='active-booking-card'>
      <div className='wraper'>
        <div className='l-side'>
          <div className='active-bookings-numbers'>
            <p>{history.hour}</p>
            <p>{history.online_price} lei</p>
          </div>
          <div className='active-bookings-details'>
            <p style={{ fontSize: '16px' }}>{history.day}</p>
            <p>{history.name}</p>
            <p>{history.class_type}</p>
          </div>
        </div>
        <div className='active-bookings-status'>
          {buttonVisible ? (
            <>
              <button
                className='buttonPresent'
                onClick={() => changeStatus('present')}
              >
                Present
              </button>
              <button
                className='buttonAbsent'
                onClick={() => changeStatus('absent')}
              >
                Absent
              </button>
            </>
          ) : buttonCancel && !buttonVisible ? (
            <button
              className='buttonCancel'
              onClick={() => changeStatus('canceled')}
            >
              Cancel
            </button>
          ) : (
            <p
              style={{
                marginBlockStart: '4em',
                marginBlockEnd: '0em',
                marginInlineEnd: '10px',
                fontSize: '16px',
              }}
            >
              <i>
                {history.state.charAt(0).toUpperCase() +
                  history.state.slice(1).toLowerCase()}
              </i>
            </p>
          )}
        </div>
      </div>
      {coverageVisible == true ? (
        <ClassCoverage
          userSubscriptions={history.user_subscriptions}
          changeStatus={changeStatus}
        />
      ) : (
        ''
      )}
    </div>
  )
}
