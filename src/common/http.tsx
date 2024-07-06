import axios from "axios";
import router from "umi/router";
import { API } from "./API";


// const baseUrl = 'https://hy.hopechart.com:12343';
// const baseUrl = 'http://114.55.225.21:8097';

const clearRequest = {
    source: axios.CancelToken.source(),
}

const $http = axios.create({
    // baseURL: ,
    timeout: 300000,
    withCredentials: true,//请求头带cookie
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
});

// 配置发送请求拦截器
$http.interceptors.request.use(config => {
    config.cancelToken = clearRequest.source.token;
    const token: any = localStorage.getItem('login_token');
    if (token) {
        config.headers.token = token
    };
    if (config.method === 'post') {
        config.data = config.data
    }
    return config;
}, error => {
    return Promise.reject(error)
})

// 配置请求返回拦截器
$http.interceptors.response.use(res => {
    console.log('response::', res)

    if (res.config.url === '/api/thunder_backend/user/login' && res.data.code === 200) {
        localStorage.setItem('login_token', res.data.data);
    }
    if (res.data.code === 500) {
        router.replace('/login');
        return Error;
    }
    return res.data
})


interface ResponseData {
    code: number,
    msg: string,
    data?: any,
    sub_code?: string
}


export {
    $http,
    axios,
    clearRequest,
    API,
    ResponseData
}