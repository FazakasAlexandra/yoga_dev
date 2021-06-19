import { useState } from 'react'
import ClientChart from '../components/ClientChart'
import ActiveBookingCard from '../components/ActiveBookingCard'
import db from '../db'
import AdminClientSubscriptionSection from '../components/AdminClientSubscriptionSection'

export default function ClientsInfo({ client, setClient, listSub }) {
  const reloadClientInfo = () => {
    db.users.getClients().then((res) => {
      const targetClient = res.data.find(
        (userClient) => +userClient.id === +client.id
      )
      setClient(targetClient)
    })
  }

  const ClientInfo = () => {
    const pendingHist = client.history.filter(
      (history) => history.state === 'pending'
    )
    return pendingHist.map((history) => {
      return (
        <>
          <ActiveBookingCard
            subscriptions={client.user_subscriptions}
            key={history.booking_id}
            history={history}
            buttonVisible={true}
            buttonCancel={false}
            reloadClientInfo={reloadClientInfo}
            coverageVisible={true}
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
          subscriptions={client.user_subscriptions}
          key={latestBooking[0].booking_id + 1}
          history={latestBooking[0]}
          buttonVisible={false}
          buttonCancel={false}
          reloadClientInfo={reloadClientInfo}
        />
      </>
    )
  }

  const ClientSubscriptions = () => {
    return (
      <>
        <AdminClientSubscriptionSection
          listSub={listSub}
          reloadClientInfo={reloadClientInfo}
          subscriptions={client.user_subscriptions}
          clientid={client}
        />
      </>
    )
  }

  return (
    <>
      <ClientChart info={client.history} />
      <hr />
      <div className='bellowChart'>
        <h3>Active Bookings</h3>
        <div className='client-active-booking'>{ClientInfo()}</div>
        <div className='client-last-booking'>{LatestBooking()}</div>
        <div className='client-subscriptions'>{ClientSubscriptions()}</div>
      </div>
    </>
  )
}
