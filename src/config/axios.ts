import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { serverUrls, globals } from './globals';
import https from 'https';
// eslint-disable-next-line no-process-env
export const hibpUrl = serverUrls.HIBP_API;
const agent = new https.Agent({
    rejectUnauthorized: false
});

export const HIBPInstance = axios.create({
    baseURL: `${hibpUrl}/api/v3/`,
    withCredentials: true
});

export const hibpConfig = {
    headers: {
        'Content-Type': 'application/json',
        'hibp-api-key': globals.HIBP_API_KEY
    }
};
