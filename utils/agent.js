import axios from 'axios';
import nextConfig from './../config/next.config'

export default axios.create({
    baseURL: nextConfig.BASE_URL
});

export const CancelToken = axios.CancelToken;