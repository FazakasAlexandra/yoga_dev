import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/client'
import Layout from '../../../../components/Layout'
import { useRouter } from 'next/router'
import AdminLayout from '../../../../components/AdminLayout'
import AdminClassesLayout from '../../../../components/AdminClassesLayout'
import DayScheduleCardForm from '../../../../components/DayScheduleCardForm'
import db from '../../../../db.js'

export default function WeekScheduleAdmin({ latestSchedule }) {
    const router = useRouter()
    const [session, loading] = useSession()
    const [weekSchedule, setWeekSchedule] = useState([{
        day: "Monday",
        date: "2021-04-05",
        dateWeekStart: "2021-04-05",
        dateWeekEnd: "2021-04-11",
        schedule: [
            {
                schedulesWeeksId: "1",
                hour: "8:00",
                className: "Morning yoga",
                classDescription: "For morning people",
                classLevel: "begginer",
                onlinePrice: "25",
                offlinePrice: "35"
            },
            {
                schedulesWeeksId: "2",
                hour: "18:00",
                className: "Back, neck, and shoulders",
                classDescription: "For those with back and posture problems",
                classLevel: "begginer",
                onlinePrice: "25",
                offlinePrice: "35"
            },
            {
                schedulesWeeksId: "5",
                hour: "19:45",
                className: "Complete Class (Strength, Stretch, Relaxation/Pranayama)",
                classDescription: "Everything you can get",
                classLevel: "begginer",
                onlinePrice: "25",
                offlinePrice: "35"
            }
        ]
    }])

    useEffect(()=>{
        db.schedules.getLatestSchedule().then(res => {
            setWeekSchedule(res.data)
        })
    }, [])


    useEffect(() => {
        if (!loading && !session) router.push({ pathname: '/' })
    }, [session])

    const getScheduleCards = () => {
        return weekSchedule.map((day, idx) => {
            return <DayScheduleCardForm
              key={idx} 
              dayData={day}
            />
        })
    }

    return (
        <Layout activeTab={"account"}>
            <AdminLayout activeTab={"classes"}>
                <AdminClassesLayout activeTab={"week_schedule"}>
                    <div className="day-schedule-cards">
                        {getScheduleCards()}
                    </div>
                </AdminClassesLayout>
            </AdminLayout>
        </Layout>
    )
}
