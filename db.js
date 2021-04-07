const db = {
    baseURL: "http://localhost/yoga",
    queryUsers: (criteria, value) => {
        return fetch(`${db.baseURL}/users/${criteria}/${value}`)
        .then(res => res.json())
    },
    postUser: (user) => {
        return fetch(`${db.baseURL}/users`, {
            method: "POST",
            body: JSON.stringify(user)
        }).then(res => res.json())
    }
}

export default db