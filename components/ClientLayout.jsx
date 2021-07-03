import ActiveBookingCard from '../components/ActiveBookingCard'
import AdminSubscriptionCard from '../components/AdminSubscriptionCard'
import db from '../db'
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

export default function ClientLayout({ user, setUser }) {
  const bookingsLimitNr = 2
  const [limitActiveBooking, setLimitActiveBooking] = useState(bookingsLimitNr)
  const [limitPastBooking, setLimitPastBooking] = useState(bookingsLimitNr)
  const [displayActive, setDisplayActive] = useState(false)
  const [displayPast, setDisplayPast] = useState(false)

  const reloadClientInfo = () => {
    db.users.getOneClient(user.jwt).then((res) => {
      setUser(res.data)
    })
  }

  useEffect(() => {
    const elements = document.querySelectorAll(
      '.client-account-activeb .active-booking-card'
    ).length
    elements < limitActiveBooking && elements > bookingsLimitNr ? setDisplayActive(true) : ''
  }, [limitActiveBooking])

  useEffect(() => {
    const elements = document.querySelectorAll('.client-account-pastb .active-booking-card').length
    elements < limitPastBooking && elements > bookingsLimitNr ? setDisplayPast(true) : ''
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
    return user.user_subscriptions.length != 0 ? (
      user.user_subscriptions.map((sub) => {
        return (
          <AdminSubscriptionCard
            key={sub.usersSubscriptionID}
            subscription={sub}
            reloadClientInfo={reloadClientInfo}
          />
        )
      })
    ) : (
      <p>
        <i>No Active Subscriptions</i>
      </p>
    )
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
        <h2>Current bookings</h2>
        <div className='client-account-activeb'>
          {activeBookings()}
          <div className='container'>
            <div
              className='dot'
              style={{ display: !displayActive ? 'block' : 'none' }}
              onClick={() => {
                setLimitActiveBooking(limitActiveBooking + bookingsLimitNr)
              }}
            ></div>
            <div
              style={{ display: displayActive ? 'block' : 'none' }}
              onClick={() => {
                setLimitActiveBooking(bookingsLimitNr)
                setDisplayActive(false)
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
              style={{ display: !displayPast ? 'block' : 'none' }}
              onClick={() => {
                setLimitPastBooking(limitPastBooking + bookingsLimitNr)
              }}
            ></div>
            <div
              style={{ display: displayPast ? 'block' : 'none' }}
              onClick={() => {
                setLimitPastBooking(bookingsLimitNr)
                setDisplayPast(false)
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
