import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'
import db from '../db'
import ClientChart from '../components/ClientChart'
import ActiveBookingCard from '../components/ActiveBookingCard'
import AdminSubscriptionCard from '../components/AdminSubscriptionCard'

export default function ClientsInfo({ client, selectClient }) {
  const router = useRouter()
  const [session, loading] = useSession()
  const [clientHistory, setClientHistory] = useState()
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    if (!session) router.push({ pathname: '/' })
  }, [session])

  useEffect(() => {
    if (session) updateUserData()
  }, [session])

  useEffect(() => {
    db.users.getClientHistory(client).then((res) => setClientHistory(res.data))
  }, [client])

  if (!client) {
    selectClient(client)
  }

  const updateUserData = () =>
    db.users.queryUsers('email', session.user.email).then((res) => {
      setUserData(res.data)
      let userBookingsMap = res.data.bookingIds.reduce((map, bookingId) => {
        map[bookingId] = true
        return map
      }, {})
    })

  const ClientInfo = () => {
    if (clientHistory && userData) {
      return clientHistory
        .filter((history) => history.state == 'pending')
        .filter((history, i) => i < 2)
        .map((history) => {
          return (
            <>
              <ActiveBookingCard
                history={history}
                userData={userData.jwt}
                buttonVisible='buttonVisible'
              />
            </>
          )
        })
    }
  }

  const Chart = () => {
    if (clientHistory) return <ClientChart info={clientHistory} />
  }

  const LatestBooking = () => {
    if (clientHistory) {
      const latestBooking = clientHistory.slice(-1)
      return (
        <>
          <h3>Last Booking</h3>
          <ActiveBookingCard
            history={latestBooking[0]}
            userData={userData.jwt}
            buttonVisible='buttonInvisible'
          />
        </>
      )
    }
  }

  const ClientSubscriptions = () => {
    return (
      <>
        <AdminSubscriptionCard />
        <AdminSubscriptionCard />
      </>
    )
  }

  return (
    <>
      {Chart()}
      <div>
        <div className='client-active-booking'>
          <h3>Active Bookings</h3>
          {ClientInfo()}
        </div>
        <div className='client-last-booking'>{LatestBooking()}</div>
        <div>
          <h3>Subscriptions</h3>
          <div className='client-subscriptions'>{ClientSubscriptions()}</div>
        </div>
      </div>
    </>
  )
}
