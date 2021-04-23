const db = {
    baseURL: "http://localhost/yoga",
    queryUsers: (criteria, value) => {
        return fetch(`${db.baseURL}/users/${criteria}/${value}`).then(res=>res.json())
    },
    postUser: (user) => {
        return fetch(`${db.baseURL}/users`, {
            method: "POST",
            body: JSON.stringify(user)
        }).then(res => res.json())
    },
    schedules : {
        getSchedule: (startDate, endDate) => {
            return fetch(`${db.baseURL}/schedules/${startDate}/${endDate}`).then(res => res.json())
        },
        getLatestSchedule : () => {
           return fetch(`${db.baseURL}/schedules/latest`).then(res => res.json())
        }
    },
    bookings : {
        postBooking: (jwt, scheduleWeekId) => {
            return fetch(`${db.baseURL}/bookings/${scheduleWeekId}`, {
                headers: {
                    'Authorization' : jwt,
                },
                method: "POST",
            }).then(res => res.json())
        }
    }
}

export default db