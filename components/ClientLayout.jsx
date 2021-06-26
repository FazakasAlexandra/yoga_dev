import ActiveBookingCard from '../components/ActiveBookingCard'
import AdminSubscriptionCard from '../components/AdminSubscriptionCard'
import db from '../db'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

export default function ClientLayout({ user, setUser }) {
  const [limitActiveBooking, setLimitActiveBooking] = useState(2)
  const [limitPastBooking, setLimitPastBooking] = useState(2)
  const [display, setDisplay] = useState(false)

  const reloadClientInfo = () => {
    db.users.getOneClient(user.jwt).then((res) => {
      setUser(res.data)
    })
  }

  useEffect(() => {
    const elements = document.querySelectorAll(
      '.client-account-activeb .active-booking-card'
    ).length
    elements < limitActiveBooking && elements > 2 ? setDisplay(true) : ''
  }, [limitActiveBooking])

  useEffect(() => {
    const elements = document.querySelectorAll(
      '.client-account-pastb .active-booking-card'
    ).length
    elements < limitPastBooking && elements > 2 ? setDisplay(true) : ''
  }, [limitPastBooking])

  const activeBookings = () => {
    const bookings = user.history.filter(
      (history) => history.state === 'pending'
    )
    return bookings.length != 0 ? (
      bookings.slice(0, limitActiveBooking).map((history, index) => {
        return (
          <>
            <ActiveBookingCard
              subscriptions={user.user_subscriptions}
              key={index}
              history={history}
              buttonVisible={false}
              reloadClientInfo={reloadClientInfo}
              coverageVisible={false}
              buttonCancel={true}
            />
          </>
        )
      })
    ) : (
      <p>
        <i>No Active Bookings</i>
      </p>
    )
  }

  const pastBookings = () => {
    const pastbooks = user.history.filter(
      (history) => history.state != 'pending'
    )
    return pastbooks.length != 0 ? (
      pastbooks
        .reverse()
        .slice(0, limitPastBooking)
        .map((history) => {
          return (
            <>
              <ActiveBookingCard
                subscriptions={user.user_subscriptions}
                key={history.booking_id}
                history={history}
                buttonVisible={false}
                reloadClientInfo={reloadClientInfo}
                coverageVisible={false}
                buttonCancel={false}
              />
            </>
          )
        })
    ) : (
      <p>
        <i>No Past Bookings</i>
      </p>
    )
  }

  const listOfSubscriptions = () => {
    return user.user_subscriptions.map((sub) => {
      return (
        <AdminSubscriptionCard
          key={sub.usersSubscriptionID}
          subscription={sub}
          reloadClientInfo={reloadClientInfo}
        />
      )
    })
  }

  return (
    <div className='client-account-wrapper'>
      <div className='client-account-name-section'>
        <span className='list-initial'>
          {user.name.charAt(0).toUpperCase()}
        </span>
        <div>
          <p>{user.name}</p>
          <p>{user.email}</p>
        </div>
      </div>
      <div className='client-account-bookings'>
        <h2>My bookings</h2>
        <div className='client-account-activeb'>
          {activeBookings()}
          <div className='container'>
            <div
              className='dot'
              style={{ display: !display ? 'block' : 'none' }}
              onClick={() => {
                setLimitActiveBooking(limitActiveBooking + 10)
              }}
            ></div>
            <div
              style={{ display: display ? 'block' : 'none' }}
              onClick={() => {
                setLimitActiveBooking(2)
                setDisplay(false)
              }}
            >
              <FontAwesomeIcon icon={faTimes} className='info-icon' />
            </div>
          </div>
        </div>
        <div className='client-account-pastb'>
          <h2>Past bookings</h2>
          {pastBookings()}
          <div className='container'>
            <div
              className='dot'
              style={{ display: !display ? 'block' : 'none' }}
              onClick={() => {
                setLimitPastBooking(limitPastBooking + 10)
              }}
            ></div>
            <div
              style={{ display: display ? 'block' : 'none' }}
              onClick={() => {
                setLimitPastBooking(2)
                setDisplay(false)
              }}
            >
              <FontAwesomeIcon icon={faTimes} className='info-icon' />
            </div>
          </div>
        </div>
      </div>
      <div className='client-account-subs-section'>
        <h2>My subscriptions</h2>
        <div className='client-account-subs'>{listOfSubscriptions()}</div>
      </div>
    </div>
  )
}
