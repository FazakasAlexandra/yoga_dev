import { createMuiTheme } from "@material-ui/core";

const dayScheduleValidator = (schedule, dayName) => {
    let message = ''
    return {
        invalidSchedule: schedule.find(({ editMode, name, hour, class_id }) => {
            if (editMode) {
                message = `Please save or discard your changes for ${dayName} !`
                return true
            }
            if (!class_id) {
                message = hour ? `Please fill the empty class field on ${dayName} at ${hour}` : `Please fill the empty class field on ${dayName} !`
                return true
            }
            if (!hour) {
                message = `Please set an hour for ${name} on ${dayName} !`
                return true
            }
        }) || null,
        message
    }
}

const weekScheduleValidator = ( weekSchedule = [], i = 0 ) => {
    if (i === weekSchedule.length) return false

    let scheduleValidation = dayScheduleValidator(weekSchedule[i].schedule, weekSchedule[i].day)
    if (scheduleValidation.invalidSchedule) return scheduleValidation

    return weekScheduleValidator(weekSchedule, i + 1)
}

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
    weekScheduleValidator,
    theme
}