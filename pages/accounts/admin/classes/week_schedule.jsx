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
const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const getWeekDates = (startDate, isTodayIncluded) => {
    const daysIdxs = isTodayIncluded ? [0, 1, 2, 3, 4, 5, 6] : [1, 2, 3, 4, 5, 6, 7]

    return daysIdxs.map((day) => {
        let date = new Date(startDate + day * 24 * 60 * 60 * 1000)

        return {
            date: date.toISOString().slice(0, 10),
            day: weekDays[date.getDay()]
        }
    })
}

export default function WeekScheduleAdmin() {
    const router = useRouter()
    const [session, loading] = useSession()
    const [weekSchedule, setWeekSchedule] = useState([])
    const [weekStartDate, setWeekStartDate] = useState(new Date().toISOString().slice(0, 10))
    const [weekDates, setWeekDates] = useState(getWeekDates(Date.now(), false))
    const notifySucces = (message) => toast.success(message)
    const notifyError = (message) => toast.error(message)

    const handlePostSchedule = () => {
        db.getJWT().then((jwt) => {
            const formatedWeekSchedule = formatWeekSchedule(weekSchedule)
            db.schedules.postSchedule(formatedWeekSchedule, jwt.jwtToken, weekDates[0].date, weekDates[6].date)
                .then((res) => {
                    notifySucces(res.message)
                }).catch((message) => {
                    notifyError(message)
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

    useEffect(() => {
        db.schedules.getLatestSchedule().then(res => {
            const datedWeekSchedule = changeWeekScheduleDates(res.data)
            setWeekSchedule(datedWeekSchedule)
        })
    }, [])

    useEffect(() => {
        if (!loading && !session) router.push({ pathname: '/' })
    }, [session])

    useEffect(() => {
        setWeekDates(getWeekDates(new Date(weekStartDate).getTime(), true))
    }, [weekStartDate])

    useEffect(() => {
        if (weekSchedule.length > 0) {
            const datedWeekSchedule = changeWeekScheduleDates(weekSchedule)
            setWeekSchedule(datedWeekSchedule)
        }
    }, [weekDates])

    const updateWeekSchedule = (dayData, dayNumber) => {
        const updatedWeekSchedule = [...weekSchedule]
        updatedWeekSchedule[dayNumber] = dayData
        setWeekSchedule(updatedWeekSchedule)
    }

    const getScheduleCards = () => {
        return weekSchedule.map((day, idx) => {
            return <DayScheduleCardForm
                key={day.date}
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
