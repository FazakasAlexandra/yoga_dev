import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/client'
import Layout from '../../../components/Layout'
import { useRouter } from 'next/router'

export default function Clients() {
    const router = useRouter()
    const [session, loading] = useSession()

    /*     useEffect(() => {
            if (!session) router.push({ pathname: '/' })
        }, [session]) */

    // If session exists, display content
    return (
        <Layout activeTab={"account"}>
            <h1>Client account</h1>
        </Layout>
    )
}