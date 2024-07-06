const getToken = () => {
    return localStorage.getItem('login_token');
}

export {
    getToken
}