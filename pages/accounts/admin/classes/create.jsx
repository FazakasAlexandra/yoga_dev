import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/client'
import Layout from '../../../../components/Layout'
import { useRouter } from 'next/router'
import AdminLayout from '../../../../components/AdminLayout'
import AdminClassesLayout from '../../../../components/AdminClassesLayout'

export default function Page() {
    const router = useRouter()
    const [session, loading] = useSession()

    /*     useEffect(() => {
            if (!session) router.push({ pathname: '/' })
        }, []) */

    // If session exists, display content
    return (
        <Layout activeTab={"account"}>
            <AdminLayout activeTab={"classes"}>
                <AdminClassesLayout activeTab={"create"}>
                    <h3 style={{ textAlign: 'center' }}>Class form comes here</h3>
                </AdminClassesLayout>
            </AdminLayout>
        </Layout>
    )
}