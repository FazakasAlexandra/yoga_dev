import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/client'
import Layout from '../../../../components/Layout'
import { useRouter } from 'next/router'
import AdminLayout from '../../../../components/AdminLayout'
import AdminClassesLayout from '../../../../components/AdminClassesLayout'

export default function Page() {
    const router = useRouter()
    const [session, loading] = useSession()

    useEffect(() => {
        if (!session) router.push({ pathname: '/' })
    }, [session])
    
    return (
        <Layout activeTab={"account"}>
            <AdminLayout activeTab={"classes"}>
                <AdminClassesLayout activeTab={"week_schedule"}>
                    <h3 style={{textAlign : 'center'}}>Week Schedule</h3>
                </AdminClassesLayout>
            </AdminLayout>
        </Layout>
    )
}