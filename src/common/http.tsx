import axios from "axios";
import router from "umi/router";
import { API } from "./API";


// const baseUrl = 'https://hy.hopechart.com:12343';
const baseUrl = 'https://hongyun.hopechart.com:12343';

const clearRequest = {
    source: axios.CancelToken.source(),
}

const $http = axios.create({
    baseURL: baseUrl,
    timeout: 300000,
    withCredentials: true,//请求头带cookie
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
});

// 配置发送请求拦截器
$http.interceptors.request.use(config => {
    config.cancelToken = clearRequest.source.token;
    const cookie: any = localStorage.getItem('login_cookie');
    if (cookie) {
        config.headers.Authorization = cookie
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
    if (res.config.url === '/api/login') {
        localStorage.setItem('login_cookie', document.cookie);
    }
    if(res.data.code === 219) {
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