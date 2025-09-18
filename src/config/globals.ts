import EnvVar from 'dotenv';
// import { Config } from 'imap';
// import { NodemailerAuth, NodemailerServiceAuth, Auth, GraphApiAuth, OAuth2Nodemailer, ImapOAuth2 } from '@customTypes/index'
// import { LogLevel } from '@azure/msal-node';
import fs from 'fs';
import path from 'path';
export const rootPath = path.join(path.resolve(__dirname), '/../', '../');
EnvVar.config({ path: `.env.${process.env.NODE_ENV}` });

/**
 * Create Upload Folder if does not exist
 */
if (!fs.existsSync(path.join(rootPath, process.env.UPLOAD_FOLDER as string))) {
    fs.mkdirSync(path.join(rootPath, process.env.UPLOAD_FOLDER as string));
}

let mailConfig: {
    SES_ACCESS_KEY_ID: string;
    SES_SECRET_ACCESS_KEY: string;
    SES_REGION: string;
    SES_FROM_EMAIL: string;
};

let globals: {
    /**
     * Server configurations
     */
    ENV: string | undefined;
    SERVER_PORT: number;
    CORS: Array<string>;
    cookieOptions: object;
    NOT_FOUND: number;
    /**
     * Auth configurations
     */
    SERVER_SECRET: string | undefined;
    /**
     * JWT configutrations
     */
    JWT_SECRET: string | undefined;
    AGENT_CMD_JWT_SECRET: string | undefined;
    JWT_USER_EXPIRY: number;
    JWT_AGENT_EXPIRY: number;
    JWT_RESET_PASS_EXPIRY: number;
    /**
     * Redis configutrations
     */
    REDIS_SOCKET_HOST: string;
    REDIS_SOCKET_PORT: number;
    REDIS_PASSWORD: string;
    /**
     * Database configuration
     */
    DATABASE_URL: string | undefined;
    REGISTRY_USERNAME: string | undefined;
    REGISTRY_PASS: string | undefined;
    REGISTRY_SERVER: string | undefined;

    /**
     * Others
     */

    SALT_LENGTH: number;
    DEFAULT_RANDOM_BYTES: number;

    /**
     * Proxmox
     */
    PROXMOX_APIKEY: string;
    NODE_USER: string;
    NODE_PASS: string;
    NODE_NAME: string;

    /**
     * File Upload Path
     */
    UPLOAD_FOLDER: string;
    NODE_FILE_UPLOAD_URL: string;

    /**
     * Elastic search credentials
     */
    ES_USERNAME: string;
    ES_PASSWORD: string;

    /**
     * Mines
     */
    MINES_APIKEY: string;

    /**
     * Malwares key
     */
    MALWARE_READ_KEY: string;

    /**
     * Wazuh
     */
    WAZUH_USERNAME: string;
    WAZUH_PASSWORD: string;
    WAZUH_ES_USERNAME: string;
    WAZUH_ES_PASSWORD: string;

    /**
     * Host IP range
     */
    HOSTONLY_IP_RANGE: string;
};

let serverUrls: {
    PROXMOX_URL: string;
    NODE_IP: string;
    ELASTIC_SEARCH_API: string;
    MINES_API: string;
    SANDBOX_API: string;
    MALWARE_API: string;
    WAZUH_URL: string;
    WAZUH_ES_URL: string;
    WAZUH_IP: string;
    MONITORING_URL: string;
    AGENT_URL: string;
    WAZUH_MANAGER_IP: string;
};

let statusCodes: {
    OK: number;
    BAD_REQUEST: number;
    CONFLICT: number;
    UNAUTHORIZED: number;
    FORBIDDEN: number;
    NOT_FOUND: number;
    SERVER_ERROR: number;
    UNPROCESSABLE_ENTITY: number;
};

let branding: {
    BRAND_NAME: string;
};

mailConfig = {
    SES_ACCESS_KEY_ID: process.env.SES_ACCESS_KEY_ID as string,
    SES_SECRET_ACCESS_KEY: process.env.SES_SECRET_ACCESS_KEY as string,
    SES_REGION: process.env.SES_REGION as string,
    SES_FROM_EMAIL: process.env.SES_FROM_EMAIL as string
};
globals = {
    /**
     * Server configurations
     */
    ENV: process.env.NODE_ENV,
    SERVER_PORT: Number(process.env.SERVER_PORT),
    cookieOptions: {
        httpOnly: true,
        secure: false
    },
    CORS: (process.env.CORS as string).split(','),
    NOT_FOUND: -1,
    /**
     * Auth Configuration
     */
    SERVER_SECRET: process.env.SERVER_SECRET,

    /**
     * JWT configutrations
     */
    JWT_SECRET: process.env.JWT_SERVER_SECRET,
    AGENT_CMD_JWT_SECRET: process.env.AGENT_CMD_JWT_SECRET as string,
    JWT_USER_EXPIRY: Number(process.env.JWT_USER_EXPIRY),
    JWT_AGENT_EXPIRY: Number(process.env.JWT_AGENT_EXPIRY),
    JWT_RESET_PASS_EXPIRY: Number(process.env.JWT_RESET_PASS_EXPIRY),
    /**
     * Redis configutrations
     */
    REDIS_SOCKET_HOST: process.env.REDIS_SOCKET_HOST as string,
    REDIS_SOCKET_PORT: Number(process.env.REDIS_SOCKET_PORT),
    REDIS_PASSWORD: process.env.REDIS_PASSWORD as string,
    /**
     * Database configuration
     */
    DATABASE_URL: process.env.DATABASE_URL,
    REGISTRY_USERNAME: process.env.REGISTRY_USER,
    REGISTRY_PASS: process.env.REGISTRY_PASS,
    REGISTRY_SERVER: process.env.REGISTRY_SERVER,

    /**
     * Others
     */

    SALT_LENGTH: 10,
    DEFAULT_RANDOM_BYTES: 32,

    /**
     * Proxmox
     */
    PROXMOX_APIKEY: process.env.PROXMOX_API_KEY as string,
    NODE_PASS: process.env.NODE_PASS as string,
    NODE_USER: process.env.NODE_USER as string,
    NODE_NAME: process.env.NODE_NAME as string,

    /**
     * File Upload
     */
    UPLOAD_FOLDER: path.join(rootPath, process.env.UPLOAD_FOLDER as string, '/'),
    NODE_FILE_UPLOAD_URL: process.env.NODE_FILE_UPLOAD_URL as string,

    /**
     * Elastic search Creds
     */
    ES_USERNAME: process.env.ES_USERNAME as string,
    ES_PASSWORD: process.env.ES_PASS as string,

    /**
     * Mines
     */
    MINES_APIKEY: process.env.MINES_APIKEY as string,

    MALWARE_READ_KEY: process.env.MALWARE_READ_KEY as string,

    /**
     * WAZUH
     */
    WAZUH_PASSWORD: process.env.WAZUH_PASSWORD as string,
    WAZUH_USERNAME: process.env.WAZUH_USERNAME as string,
    WAZUH_ES_USERNAME: process.env.WAZUH_ES_USERNAME as string,
    WAZUH_ES_PASSWORD: process.env.WAZUH_ES_PASSWORD as string,

    HOSTONLY_IP_RANGE: process.env.HOSTONLY_IP_RANGE as string
};

serverUrls = {
    PROXMOX_URL: process.env.PROXMOX_URL as string,
    NODE_IP: process.env.NODE_IP as string,
    ELASTIC_SEARCH_API: process.env.ELASTIC_SEARCH_API as string,
    MINES_API: process.env.MINES_API as string,
    SANDBOX_API: process.env.SANDBOX_API as string,
    MALWARE_API: process.env.MALWARE_API as string,
    WAZUH_URL: process.env.WAZUH_URL as string,
    WAZUH_ES_URL: process.env.WAZUH_ES_URL as string,
    WAZUH_IP: process.env.WAZUH_IP as string,
    WAZUH_MANAGER_IP: process.env.WAZUH_MANAGER_IP as string,

    MONITORING_URL: process.env.MONITORING_URL as string,
    AGENT_URL: process.env.AGENT_URL as string
};

branding = {
    BRAND_NAME: process.env.BRAND_NAME as string
};
statusCodes = {
    OK: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    SERVER_ERROR: 500,
    UNPROCESSABLE_ENTITY: 422
};

export { globals, serverUrls, statusCodes, branding, mailConfig };
