import { useState } from 'react'
import ClientChart from '../components/ClientChart'
import ActiveBookingCard from '../components/ActiveBookingCard'
import db from '../db'

export default function ClientsInfo({ client, setClient }) {
   const reloadClientInfo = () => {
     db.users.getClients().then((res) => {
       const targetClient = res.data.find((userClient) => +userClient.id === +client.id)
       setClient(targetClient)
     })
  } 

  const ClientInfo = () => {
    const pendingHist = client.history.filter((history) => history.state === 'pending')
    return pendingHist.map((history) => {
      return (
        <>
          <ActiveBookingCard
            key={history.booking_id}
            history={history}
            buttonVisible='buttonVisible'
            reloadClientInfo={reloadClientInfo}
          />
        </>
      )
    })
  }

  const LatestBooking = () => {
    const latestBooking = client.history.slice(-1)
    return (
      <>
        <h3>Last Booking</h3>
        <ActiveBookingCard
          key={latestBooking[0].booking_id + 1}
          history={latestBooking[0]}
          buttonVisible='buttonInvisible'
          reloadClientInfo={reloadClientInfo}
        />
      </>
    )
  }

  return (
    <>
      <ClientChart info={client.history} />
      <div>
        <h3>Active Bookings</h3>
        <div className='client-active-booking'>{ClientInfo()}</div>
        <div className='client-last-booking'>{LatestBooking()}</div>
      </div>
    </>
  )
}
