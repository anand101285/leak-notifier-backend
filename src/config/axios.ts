import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { serverUrls, globals } from './globals';
import https from 'https';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// eslint-disable-next-line no-process-env
export const backendUrl = serverUrls.PROXMOX_URL;
export const minesUrl = serverUrls.MINES_API;
export const sandboxUrl = serverUrls.SANDBOX_API;
export const malwareUrl = serverUrls.MALWARE_API;
export const WazuhESUrl = serverUrls.WAZUH_ES_URL;
const agent = new https.Agent({
    rejectUnauthorized: false
});

export const ProxmoxInstance = axios.create({
    baseURL: `${backendUrl}/api2/json/`,
    withCredentials: true
});

export const MinesInstance = axios.create({
    baseURL: `${minesUrl}/api/`,
    withCredentials: true
});

export const SandboxInstance = axios.create({
    baseURL: `${sandboxUrl}/apiv2/`,
    withCredentials: true
});

export const MalwareInstance = axios.create({
    baseURL: `${malwareUrl}/`,
    withCredentials: true
});

export const WazuhInstance = axios.create({
    baseURL: `${serverUrls.WAZUH_URL}/`,
    withCredentials: true
});

export const WazuhESInstance = axios.create({
    baseURL: `${WazuhESUrl}/`,
    withCredentials: true
});

export const wazuhESConfig: AxiosRequestConfig = {
    headers: {
        'Content-Type': 'application/json'
    },
    auth: {
        username: globals.WAZUH_ES_USERNAME,
        password: globals.WAZUH_ES_PASSWORD
    }
};

export const malwareConfig = {
    headers: {
        'Content-Type': 'application/json',
        key: globals.MALWARE_READ_KEY
    }
};

export const sandboxConfig = {
    headers: {
        'Content-Type': 'application/json',
        Authorization: ''
    }
};

export const minesConfig = {
    headers: {
        'Content-Type': 'application/json', // application/x-www.form-urlencoded,
        Authorization: globals.MINES_APIKEY
    }
};

export const config = {
    httpsAgent: agent,
    headers: {
        'Content-Type': 'application/json', // application/x-www.form-urlencoded
        Authorization: globals.PROXMOX_APIKEY
    }
};

// export const ElasticSearchInstance = axios.create({
//     baseURL: `${elasticSearchUrl}/`,
//     withCredentials: true
// });

// export const esConfig = {
//     httpsAgent: agent,
//     headers: {
//         'Content-Type': 'application/json', // application/x-www.form-urlencoded
//         Authorization: 'Basic ZWxhc3RpYzowK18zMkdxeFo0bl9jST1ueFpvWQ=='
//     }
// };
