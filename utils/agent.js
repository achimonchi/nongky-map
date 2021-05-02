import axios from 'axios';
import nextConfig from './../config/next.config'

export const agent = axios.create({
    baseURL: nextConfig.BASE_URL
});

export const wilayah = axios.create({
    baseURL: "https://dev.farizdotid.com/api"
})

export const CancelToken = axios.CancelToken;