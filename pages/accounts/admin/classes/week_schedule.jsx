import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/client'
import Layout from '../../../../components/Layout'
import { useRouter } from 'next/router'
import AdminLayout from '../../../../components/AdminLayout'
import AdminClassesLayout from '../../../../components/AdminClassesLayout'
import DayScheduleCardForm from '../../../../components/DayScheduleCardForm'
import db from '../../../../db.js'
import TextField from '@material-ui/core/TextField';
import { ThemeProvider } from "@material-ui/core";
import { formatWeekSchedule, theme } from '../../../../utilities.js'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css';
import { getWeekDates } from '../../../../utilities.js'

export default function WeekScheduleAdmin() {
    const router = useRouter()
    const [session, loading] = useSession()
    const [weekSchedule, setWeekSchedule] = useState([])
    const [weekStartDate, setWeekStartDate] = useState(new Date().toISOString().slice(0, 10))
    const [weekDates, setWeekDates] = useState(getWeekDates(Date.now()))

    useEffect(() => {
        db.schedules.getLatestSchedule().then(res => {
            const sortedSchedule = res.data.sort((a,b) => new Date(a.date) - new Date(b.date));
            // 2 -> 5
            // 1 -> 7 
            // 26   23
            // 27   24
            const datedWeekSchedule = changeWeekScheduleDates(sortedSchedule)

            setWeekSchedule(datedWeekSchedule)
        })
    }, [])

    useEffect(() => {
        if (!loading && !session) router.push({ pathname: '/' })
    }, [session])

    useEffect(() => {
        setWeekDates(getWeekDates(new Date(weekStartDate).getTime()))
    }, [weekStartDate])

    useEffect(() => {
        if (weekSchedule.length > 0) {
            const datedWeekSchedule = changeWeekScheduleDates(weekSchedule)
            console.log(datedWeekSchedule)
            setWeekSchedule(datedWeekSchedule)
        }
    }, [weekDates])

    const handlePostSchedule = () => {
        db.getJWT().then(({ jwtToken }) => {
            const formatedWeekSchedule = formatWeekSchedule(weekSchedule)
            db.schedules.postSchedule(formatedWeekSchedule, jwtToken, weekDates[0].date, weekDates[6].date)
                .then((res) => {
                    toast.success(res.message)
                }).catch((message) => {
                    toast.error(message)
                })
        })
    }

    const changeWeekScheduleDates = (weekSchedule) => {
        const datedWeekSchedule = weekSchedule.map((dayData, idx) => {
            dayData.date = weekDates[idx].date
            dayData.day = weekDates[idx].day
            return dayData
        })
        return datedWeekSchedule
    }

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
                    <div className="week_schedule-form">
                        <ThemeProvider theme={theme}>
                            <TextField
                                id="date"
                                label="Week start date"
                                type="date"
                                defaultValue={weekStartDate}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    min: new Date().toISOString().slice(0, 10)
                                }}
                                onChange={(e) => {
                                    setWeekStartDate(e.target.value)
                                }}
                            />
                        </ThemeProvider>
                        <a
                            className="button-white"
                            style={{ marginTop: "1rem" }}
                            onClick={() => handlePostSchedule()}
                        >
                            Post Schedule
                        </a>
                    </div>
                    <div className="day-schedule-cards">
                        {getScheduleCards()}
                    </div>
                    <ToastContainer />
                </AdminClassesLayout>
            </AdminLayout>
        </Layout>
    )
}
