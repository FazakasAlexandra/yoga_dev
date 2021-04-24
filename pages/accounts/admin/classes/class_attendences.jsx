import React from 'react'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/client'
import Layout from '../../../../components/Layout'
import { useRouter } from 'next/router'
import AdminLayout from '../../../../components/AdminLayout'
import AdminClassesLayout from '../../../../components/AdminClassesLayout'
import Chart from 'react-google-charts'

export default function Page() {
    const router = useRouter()
    const [session, loading] = useSession()

    useEffect(() => {
        if (!session) router.push({ pathname: '/' })
    }, [session])

    return (
        <Layout activeTab={"account"}>
            <AdminLayout activeTab={"classes"}>
                <AdminClassesLayout>
                    <h1>attendence for every class</h1>
                </AdminClassesLayout>
            </AdminLayout>
        </Layout>
    )
  }
  

