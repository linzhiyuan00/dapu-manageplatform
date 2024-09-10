const getToken = () => {
    return localStorage.getItem('login_token');
}

const getLangType = (): ('0' | '1') => {
    const type = (localStorage.getItem('dapuManageplatformLangType') || '0') as ('0' | '1');
    return type || '0';
}

export {
    getToken,
    getLangType
}