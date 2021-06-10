const db = {
  baseURL: 'http://localhost/yoga',
  getJWT: () => {
    return fetch('/api/examples/jwt').then((res) => res.json())
  },
  schedules: {
    getSchedule: (startDate, endDate) => {
      return fetch(`${db.baseURL}/schedules/${startDate}/${endDate}`).then(
        (res) => res.json()
      )
    },
    getLatestSchedule: () => {
      return fetch(`${db.baseURL}/schedules/latest`).then((res) => res.json())
    },
    postSchedule: (weekSchedule, jwt) => {
      fetch(`${db.baseURL}/schedules`, {
        method: 'POST',
        headers: {
          Authorization: jwt,
        },
        body: JSON.stringify(weekSchedule),
      })
        .then((res) => res.json())
        .then(console.log)
    },
    removeSubscription: (jwt, id) =>
      fetch(`${db.baseURL}/subscriptions/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: jwt,
        },
      }).then((res) => res.json()),
    postSubscription: (subscription, jwt) => {
      return fetch(`${db.baseURL}/subscriptions`, {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
          Authorization: jwt.jwtToken,
        },
      }).then((res) => res.json())
    },
    getUserSubscriptionByClass: (userId, classId) => {
      return fetch(
        `${db.baseURL}/subscriptions/user/${userId}/class/${classId}`
      ).then((res) => res.json())
    },
  },
  subscriptions: {
    getSubscriptions: () => {
      return fetch(`${db.baseURL}/subscriptions`).then((res) => res.json())
    },
    removeSubscription: (jwt, id) =>
      fetch(`${db.baseURL}/subscriptions/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: jwt,
        },
      }).then((res) => res.json()),
    postSubscription: (subscription, jwt) => {
      return fetch(`${db.baseURL}/subscriptions`, {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
          Authorization: jwt.jwtToken,
        },
      }).then((res) => res.json())
    },
    getSubscriptionNames: () => {
      return fetch(`${db.baseURL}/subscriptionnames`).then((res) => res.json())
    },
    postSubscriptionToUser: (jwt, user, subscription) => {
      return fetch(`${db.baseURL}/subscriptions/${user}/${subscription}`, {
        method: 'POST',
        headers: {
          Authorization: jwt.jwtToken,
        },
      }).then((res) => res.json())
    },
    decreaseCoverage: (coverageType, id) => {
      return fetch(
        `${db.baseURL}/subscriptions/decrease/${coverageType}/${id}`
      ).then((res) => res.json())
    },
  },
  bookings: {
    postBooking: (jwt, scheduleWeekId, classType) => {
      return fetch(`${db.baseURL}/bookings/${scheduleWeekId}/${classType}`, {
        headers: {
          Authorization: jwt,
        },
        method: 'POST',
      }).then((res) => res.json())
    },
    changeStatus: (jwt, id, status) => {
      return fetch(`${db.baseURL}/chgstatus/${id}/${status}`, {
        headers: {
          Authorization: jwt,
        },
        method: 'GET',
      }).then((res) => res.json())
    },
    getClassBookings: (weekScheduleId) => {
      return fetch(`${db.baseURL}/classes/bookings/${weekScheduleId}`).then(
        (res) => res.json()
      )
    },
  },
  classes: {
    getClasses: () => {
      return fetch(`${db.baseURL}/classes`).then((res) => res.json())
    },
    deleteClass: (id) => {
      return fetch(`${db.baseURL}/classes/dlt/${id}`).then((res) => res.json())
    },
    attendences: () => {
      return fetch(`${db.baseURL}/classes/attendences`).then((res) =>
        res.json()
      )
    },
    getDayClasses: (date) => {
      return fetch(`${db.baseURL}/classes/date/${date}`).then((res) =>
        res.json()
      )
    },
  },
  users: {
    getClients: () => {
      return fetch(`${db.baseURL}/users/clients`).then((res) => res.json())
    },
    getClientHistory: (id) => {
      return fetch(`${db.baseURL}/clientshistory/client/${id}`).then((res) =>
        res.json()
      )
    },
    queryUsers: (criteria, value) => {
      return fetch(`${db.baseURL}/users/${criteria}/${value}`).then((res) =>
        res.json()
      )
    },
    postUser: (user) => {
      return fetch(`${db.baseURL}/users`, {
        method: 'POST',
        body: JSON.stringify(user),
      }).then((res) => res.json())
    },
  },
}

export default db
