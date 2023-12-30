function getToken() {
    return JSON.parse(localStorage.getItem('user')).token
}

export default getToken;