import { createMuiTheme } from "@material-ui/core";

const formatDate = (dayDate, outputType) => {
    // recieves 2021-05-12
    // returns string 12 May 2021 or an object {day: 12, month: 'May', year: 2021}
    
    let date = new Date(dayDate)
    const month = date.toLocaleString('default', { month: 'long' });
    const day = date.getUTCDate()
    const year = date.getFullYear()

    if(outputType === 'string') return day + ' ' + month

    return {month, day, year: year}
}

const formatWeekSchedule = (weekSchedule) => {
    return weekSchedule.reduce((acc, weekDay) => {
        acc.push({
            date_day: weekDay.date,
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
    formatDate,
    theme
}