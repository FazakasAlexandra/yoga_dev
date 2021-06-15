import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/client'
import Layout from '../../../components/Layout'
import { useRouter } from 'next/router'
import AdminLayout from '../../../components/AdminLayout'
import AdminClients from '../../../components/AdminClients'
import db from '../../../db'

export default function Clients() {
  const router = useRouter()
  const [session, loading] = useSession()
  const [clients, setClients] = useState([])
  const [listSub, setListSub] = useState([])

  useEffect(() => {
    if (!loading && !session) router.push({ pathname: '/' })
  }, [session])

  useEffect(() => {
    db.users.getClients().then((res) => setClients(res.data))
    db.subscriptions.getSubscriptionNames().then((res) => setListSub(res.data))
  }, [])

  return (
    <Layout activeTab={'account'}>
      <AdminLayout activeTab={'clients'}>
        {clients.length > 0 ? (
          <AdminClients myclients={clients} listSub={listSub} />
        ) : null}
      </AdminLayout>
    </Layout>
  )
}
