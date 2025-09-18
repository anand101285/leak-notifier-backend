/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
export type OAuth2Nodemailer = {
    type: string;
    user: string;
    redirectUrl: string;
    clientId: string;
    clientSecret: string;
    refreshToken: string;
    accessToken: unknown;
};

export type Auth = {
    user: string;
    pass: string;
};

export type NodemailerAuth = {
    host: string;
    port: number;
    secure: boolean;
    auth: OAuth2Nodemailer | Auth;
    tls?: {
        // do not fail on invalid certs
        rejectUnauthorized: boolean;
    };
};

export type NodemailerServiceAuth = {
    service: string;
    auth: OAuth2Nodemailer | Auth;
};

export interface ISetMailAttachmentOptions {
    filename: string;
    content: Buffer;
}
