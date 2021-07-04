import SubscriptionCard from '../components/SubscriptionCard'
import Layout from '../components/Layout'
import { useState, useEffect } from 'react'
import db from '../db.js'

export default function Subscriptions() {
  const [subscriptions, setSubscriptions] = useState([])
  console.log(subscriptions.length)
  useEffect(() => {
    db.subscriptions.getSubscriptions().then((res) => {
      setSubscriptions(res.data)
    })
  }, [])

  const getSubscriptions = () => {
    return subscriptions.map((subscription) => {
      return (
        <SubscriptionCard key={subscription.id} subscription={subscription} />
      )
    })
  }

  return (
    <Layout activeTab={'subscriptions'}>
      <div className='subscriptions'>
        <div className='color'></div>
        <div className='radius'></div>
        {subscriptions.length ? getSubscriptions() : <h2 className="no-data-txt">NO SUBSCRIPTIONS AVAILABLE</h2>}
      </div>
    </Layout>
  )
}
