import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/client'
import Layout from '../../../components/Layout'
import { useRouter } from 'next/router'
import ClientLayout from '../../../components/ClientLayout'
import db from '../../../db.js'

export default function Clients() {
  const router = useRouter()
  const [session, loading] = useSession()
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (!loading && !session) router.push({ pathname: '/' })
  }, [session])

  useEffect(() => {
    db.getJWT().then(({ jwtToken }) => {
      db.users.getClients().then((res) => setUser(res.data.find((usr) => usr.jwt == jwtToken)))
    })
  }, [])

  return (
    <Layout activeTab={'account'}>
      {user ? (
        <ClientLayout user={user} setUser={setUser} />
      ) : null}
    </Layout>
  )
}
