import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/client'
import Layout from '../../../../components/Layout'
import { useRouter } from 'next/router'
import AdminLayout from '../../../../components/AdminLayout'
import AdminClassesLayout from '../../../../components/AdminClassesLayout'
import DayScheduleCardForm from '../../../../components/DayScheduleCardForm'
import db from '../../../../db.js'

export default function WeekScheduleAdmin() {
    const router = useRouter()
    const [session, loading] = useSession()
    const [weekSchedule, setWeekSchedule] = useState([])

    useEffect(()=>{
        db.schedules.getLatestSchedule().then(res => {
            setWeekSchedule(res.data)
        })
    }, [])

    useEffect(() => {
        if (!loading && !session) router.push({ pathname: '/' })
    }, [session])

    const updateWeekSchedule = (dayData, dayNumber) => {
        const updatedWeekSchedule = [...weekSchedule]
        updatedWeekSchedule[dayNumber] = dayData
        setWeekSchedule(updatedWeekSchedule)
    }

    const getScheduleCards = () => {
        return weekSchedule.map((day, idx) => {
            return <DayScheduleCardForm
              key={idx}
              dayNumber={idx} 
              dayData={day}
              updateWeekSchedule={updateWeekSchedule}
              schedule={day.schedule}
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
