import { createMuiTheme } from "@material-ui/core";

const formatWeekSchedule = (weekSchedule, date_week_start, date_week_end) => {
    return weekSchedule.reduce((acc, weekDay) => {
        acc.push({
            date_day: weekDay.date,
            date_week_start,
            date_week_end,
            schedule: weekDay.schedule.reduce((acc, schedule)=>{
                acc.push({
                    hour : schedule.hour,
                    class_id : schedule.class_id,
                    day : weekDay.day
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
    theme
}