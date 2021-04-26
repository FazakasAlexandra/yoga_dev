import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/client'
import Layout from '../../../components/Layout'
import { useRouter } from 'next/router'
import AdminLayout from '../../../components/AdminLayout'
import AdminClients from '../../../components/AdminClients'

export default function Page() {
    const router = useRouter()
    const [session, loading] = useSession()

    useEffect(() => {
        if (!loading && !session) router.push({ pathname: '/' })
    }, [session])
    
    return (
        <Layout activeTab={"account"}>
            <AdminLayout activeTab={"clients"}>
                <AdminClients />
            </AdminLayout>
        </Layout>
    )
}