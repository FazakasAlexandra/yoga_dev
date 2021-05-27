import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/client'
import Layout from '../../../components/Layout'
import { useRouter } from 'next/router'
import AdminLayout from '../../../components/AdminLayout'
import SubscriptionCard from '../../../components/SubscriptionCard'
import SubscriptionForm from '../../../components/SubscriptionForm'
import db from '../../../db'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import _ from 'lodash'

export default function Page() {
  const router = useRouter()
  const [session, loading] = useSession()
  const [subscriptions, setSubscriptions] = useState([])
  const [subscriptionsForms, setSubscriptionsForms] = useState([])

  const removeSubscription = (id) => {
    const newSubscriptions = subscriptions.filter(subscription => +subscription.id != +id)
    setSubscriptions(newSubscriptions)
  }

  const removeForm = (id) => {
    const newForms = subscriptionsForms.filter(form => form !== id)
    setSubscriptionsForms(newForms)
  }

  const addNewSubscription = (subscription) => {
    setSubscriptions([subscription, ...subscriptions])
  }

  useEffect(() => {
    db.subscriptions.getSubscriptions().then(res => {
      setSubscriptions(res.data)
    })
  }, [])

  const getSubscriptions = () => {
    return subscriptions.map(subscription => {
      console.log(subscription.id)
      return <SubscriptionCard
        key={subscription.id}
        subscription={subscription}
        admin={true}
        removeSubscriptionCard={removeSubscription}
      />
    })
  }

  const getSubscriptionForms = () => {
    return subscriptionsForms.map(subscriptionForm => {
      return <SubscriptionForm
        id={subscriptionForm}
        key={subscriptionForm}
        removeForm={removeForm}
        addNewSubscriptionCard={addNewSubscription}
      />
    })
  }

  useEffect(() => {
    if (!loading && !session) router.push({ pathname: '/' })
  }, [session])

  return (
    <Layout activeTab={"account"}>
      <AdminLayout activeTab={"subscriptions"}>
        <button
          className="button-white admin"
          style={{ alignSelf: "baseline" }}
          onClick={() => setSubscriptionsForms([_.uniqueId('form'), ...subscriptionsForms])}>
          <FontAwesomeIcon
            icon={faPlus}
            size="lg"
          />
        </button>
        <div className="subscriptions-admin">
          {getSubscriptionForms()}
          {getSubscriptions()}
        </div>
      </AdminLayout>
    </Layout>
  )
}