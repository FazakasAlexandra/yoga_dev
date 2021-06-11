import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/client'
import Layout from '../../../../components/Layout'
import { useRouter } from 'next/router'
import AdminLayout from '../../../../components/AdminLayout'
import AdminClassesLayout from '../../../../components/AdminClassesLayout'
import Chart from 'react-google-charts'
import db from '../../../../db'

export default function Page() {
    const router = useRouter()
    const [session, loading] = useSession()
    const [attendences, setAttendences] = useState([])

    useEffect(() => {
        if (!loading && !session) router.push({ pathname: '/' })
    }, [session])

    useEffect(() => {
        db.classes.attendences().then(res => {
            let classesAttendences = res.data.map((yogaClass) => {
                return [
                    yogaClass.class_name,
                    parseInt(yogaClass.attendences)
                ]
            })
            classesAttendences.unshift(['Attendences', 'attendences'])
            setAttendences(classesAttendences)
        })
    }, [])

    console.log(attendences)
    
    const getAttendences = () => {
        let classesAttendences = attendences.map((yogaClass) => {
            return [
                yogaClass.class_name,
                parseInt(yogaClass.attendences)
            ]
        })
        console.log(classesAttendences)
        return classesAttendences
    }

    return (
        <Layout activeTab={"account"}>
            <AdminLayout activeTab={"classes"}>
                <AdminClassesLayout activeTab={"attendences"}>
                    <div className="chart-container" style={{ width: "100%" }}>
                        <Chart
                            width={"100%"}
                            height={'500px'}
                            chartType="BarChart"
                            loader={<div>Loading Chart</div>}
                            data={attendences} 
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