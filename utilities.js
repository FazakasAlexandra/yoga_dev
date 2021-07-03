import { createMuiTheme } from "@material-ui/core";

const getWeekDates = (startDate) => {
    const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

    // map weekDays indexes
    return [0, 1, 2, 3, 4, 5, 6].map((day) => {
        let date = new Date(startDate + day * 24 * 60 * 60 * 1000)

        return {
            date: date.toISOString().slice(0, 10),
            day: weekDays[date.getDay()]
        }
    })
}

// recieves 2021-05-12
// returns string 12 May 2021 or an object {day: 12, month: 'May', year: 2021}
const formatDate = (dayDate, outputType, fullDate) => {
    let date = new Date(dayDate)
    const month = date.toLocaleString('default', { month: 'long' });
    const day = date.getUTCDate()
    const year = date.getFullYear()

    if (outputType === 'string' && fullDate) return day + ' ' + month + ' ' + year

    if (outputType === 'string') return day + ' ' + month

    return { month, day, year: year }
}

const formatWeekSchedule = (weekSchedule) => {
    return weekSchedule.reduce((acc, weekDay) => {
        acc.push({
            date_day: weekDay.date,
            day: weekDay.day,
            schedule: weekDay.schedule.reduce((acc, schedule) => {
                acc.push({
                    hour: schedule.hour,
                    class_id: schedule.class_id,
                })
                return acc
            }, [])
        })
        return acc
    }, [])
}

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#6CBBC7",
        },
    },
});

module.exports = {
    formatWeekSchedule,
    formatDate,
    getWeekDates,
    theme
}