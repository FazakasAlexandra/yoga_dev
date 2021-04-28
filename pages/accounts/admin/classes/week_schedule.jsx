import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/client'
import Layout from '../../../../components/Layout'
import { useRouter } from 'next/router'
import AdminLayout from '../../../../components/AdminLayout'
import AdminClassesLayout from '../../../../components/AdminClassesLayout'
import DayScheduleCardForm from '../../../../components/DayScheduleCardForm'
import db from '../../../../db.js'
import TextField from '@material-ui/core/TextField';
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#6CBBC7",
        },
    },
});

const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

const getWeekDates = (startDate, isTodayIncluded) => {
    const days = isTodayIncluded ? [0, 1, 2, 3, 4, 5, 6] : [1, 2, 3, 4, 5, 6, 7]
    return days.map((day) => {
        day = {
            date: new Date(startDate + day * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
            day: weekDays[new Date(startDate + day * 24 * 60 * 60 * 1000).getDay() - 1] || 'Sunday'
        }
        return day
    })
}

export default function WeekScheduleAdmin() {
    const router = useRouter()
    const [session, loading] = useSession()
    const [weekSchedule, setWeekSchedule] = useState([])
    const [weekStartDate, setWeekStartDate] = useState(new Date().toISOString().slice(0, 10))
    const [weekDates, setWeekDates] = useState(getWeekDates(Date.now(), false))

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
        setWeekDates(getWeekDates(new Date(weekStartDate).getTime(), true))
    }, [weekStartDate])

    useEffect(() => {
        if (weekSchedule.length > 0) {
            const datedWeekSchedule = changeWeekScheduleDates(weekDates)
            setWeekSchedule(datedWeekSchedule)
        }
    }, [weekDates])

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
                    <div style={{ display: "flex", flexDirection:"column", margin: "1rem" }}>
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
                                    console.log(new Date(e.target.value))
                                    setWeekStartDate(e.target.value)
                                }}
                            />
                        </ThemeProvider>
                        <a
                            className="button-white"
                            style={{ marginTop: "1rem" }}
                            onClick={() => {
                                console.log(weekSchedule, weekDates)
                            }}
                        >
                            Post Schedule
                            </a>
                    </div>
                    <div className="day-schedule-cards">
                        {getScheduleCards()}
                    </div>
                </AdminClassesLayout>
            </AdminLayout>
        </Layout>
    )
}
