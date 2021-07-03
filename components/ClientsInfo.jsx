import db from '../db'
import ClientChart from '../components/ClientChart'
import ActiveBookingCard from '../components/ActiveBookingCard'
import AdminClientSubscriptionSection from '../components/AdminClientSubscriptionSection'

export default function ClientsInfo({ client, setClient, listSub }) {
  const reloadClientInfo = () => {
    db.users.getClients().then((res) => {
      const targetClient = res.data.find((userClient) => +userClient.id === +client.id)
      setClient(targetClient)
    })
  }

  const clientInfo = () => {
    const pendingHist = client.history.filter(
      (history) => history.state === 'pending'
    )
    if (pendingHist.length) {
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

    return <i>{client.name.split(" ")[0]} has no active bookings</i>
  }

  const latestBooking = () => {
    const latestBooking = client.history.slice(-1)
    console.log(latestBooking)
    console.log(client.history)
    if (latestBooking.length) {
      return (
        <>
          <h3>Last Booking</h3>
          <ActiveBookingCard
            subscriptions={client.user_subscriptions}
            key={latestBooking[0].booking_id}
            history={latestBooking[0]}
            buttonVisible={false}
            buttonCancel={false}
            reloadClientInfo={reloadClientInfo}
          />
        </>
      )
    }

    return <>
      <h3>Last Booking</h3>
      <i style={{ margin: "1.5rem 0rem 1rem" }}>{client.name.split(" ")[0]} has no past bookings</i>
    </>
  }

  const clientSubscriptions = () => {
    return (
      <>
        <AdminClientSubscriptionSection
          listSub={listSub}
          reloadClientInfo={reloadClientInfo}
          subscriptions={client.user_subscriptions}
          clientid={client}
          clientName={client.name.split(" ")[0]}
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
        <div className='client-active-booking'>{clientInfo()}</div>
        <div className='client-last-booking'>{latestBooking()}</div>
        <div className='client-subscriptions'>{clientSubscriptions()}</div>
      </div>
    </>
  )
}
