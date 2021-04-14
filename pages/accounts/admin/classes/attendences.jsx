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

    /*     useEffect(() => {
            if (!session) router.push({ pathname: '/' })
        }, []) */

    // If session exists, display content

    return (
        <Layout activeTab={"account"}>
            <AdminLayout activeTab={"classes"}>
                <AdminClassesLayout activeTab={"attendences"}>
                    <div className="chart-container">
                        <Chart
                            width={"100%"}
                            height={'500px'}
                            chartType="BarChart"
                            loader={<div>Loading Chart</div>}
                            data={[
                                ['Attendences', 'last week', 'last month', ' last three months'],
                                ['Hot yoga', 45, 55, 77],
                                ['Morning yoga', 14, 30, 45],
                                ['Advanced super super long yoga name', 40, 60, 88],
                            ]}
                            options={{
                                // Material design options
                                title: 'Classes attendence',
                            }}
                        />
                    </div>
                </AdminClassesLayout>
            </AdminLayout>
        </Layout>
    )
}