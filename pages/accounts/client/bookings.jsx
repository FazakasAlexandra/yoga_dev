import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/client'
import Layout from '../../../components/Layout'
import { useRouter } from 'next/router'
import ClientLayout from '../../../components/ClientLayout'
import Loader from '../../../components/Loader'
import db from '../../../db.js'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common']))
    }
  }
}


export default function Clients() {
  const router = useRouter()
  const [session, loading] = useSession()
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (!loading && !session) router.push({ pathname: '/' })
  }, [session])

  useEffect(() => {
    db.getJWT().then(({ jwtToken }) => {
      db.users.getOneClient(jwtToken).then((res) => {
        setUser(res.data)
      })
    })
  }, [])

  return (
    <Layout activeTab={'account'}>
      {user ? <ClientLayout user={user} setUser={setUser} /> : <Loader/>}
    </Layout>
  )
}
