import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'
import db from '../db'
import ClientChart from '../components/ClientChart'
import ActiveBookingCard from '../components/ActiveBookingCard'

export default function ClientsInfo({ client, selectClient }) {
  const router = useRouter()
  const [session, loading] = useSession()
  const [clientHistory, setClientHistory] = useState()

  useEffect(() => {
    if (!session) router.push({ pathname: '/' })
  }, [session])

  useEffect(() => {
    db.users.getClientHistory(client).then((res) => setClientHistory(res.data))
  }, [client])

  if (!client) {
    selectClient(client)
  }

  const ClientInfo = () => {
    if (clientHistory) {
      return clientHistory
        .filter((history) => history.state == 'pending')
        .filter((history, i) => i < 2)
        .map((history) => {
          return (
            <>
              <h3>Active Bookings</h3>
              <ActiveBookingCard key={history.id} history={history} />
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
          <ActiveBookingCard history={latestBooking[0]} />
        </>
      )
    }
  }

  return (
    <>
      {Chart()}
      <div>
        <div className='client-active-booking'>{ClientInfo()}</div>
        <div className='client-last-booking'>{LatestBooking()}</div>
      </div>
    </>
  )
}
