// import { globals, rootPath } from '@config/globals';
// import {
//     Auth,
//     ISetMailAttachmentOptions,
//     NodemailerServiceAuth,
//     OAuth2Nodemailer
// } from '@customTypes/mail/index';
// import { readFileSync } from 'fs';
// import { google } from 'googleapis';
// import {
//     createTransport,
//     SendMailOptions,
//     SentMessageInfo,
//     Transporter,
//     TransportOptions
// } from 'nodemailer';
// import path from 'path';
// const OAuth2 = google.auth.OAuth2;

// /**
//  * MailService
//  *
//  * Service for sending emails
//  */
// export class MailService {
//     private from: string;
//     private mailOptions: SendMailOptions;

//     // /**
//     //  * Constructor
//     //  * @param {NodemailerAuth | NodemailerServiceAuth} authObject nodemailer auth object
//     //  */
//     //  constructor(
//     //     authObject: NodemailerAuth | NodemailerServiceAuth = globals.NODEMAILER_GENERAL_EMAIL
//     // ) {

//     // }

//     public async createTransport(): Promise<Transporter> {
//         const authObject: NodemailerServiceAuth = globals.NODEMAILER_GENERAL_EMAIL;
//         const oauth2Object = authObject.auth as OAuth2Nodemailer;
//         console.log('here');

//         const oauth2Client = new OAuth2(
//             oauth2Object.clientId,
//             oauth2Object.clientSecret,
//             oauth2Object.redirectUrl
//         );
//         oauth2Client.setCredentials({
//             // eslint-disable-next-line camelcase
//             refresh_token: oauth2Object.refreshToken
//         });
//         const accessToken = await oauth2Client.getAccessToken();

//         const transporter = createTransport({
//             service: authObject.service,
//             auth: {
//                 ...authObject.auth,
//                 accessToken: accessToken
//             }
//         } as TransportOptions);

//         this.from = oauth2Object.user;
//         return transporter;
//     }

//     /**
//      * Type guard for checking oauth2
//      *
//      * @param {Auth | OAuth2Nodemailer} auth auth object
//      * @returns {boolean}
//      */
//     private isOauth2(auth: Auth | OAuth2Nodemailer): auth is OAuth2Nodemailer {
//         return (auth as OAuth2Nodemailer).clientId !== undefined;
//     }

//     /**
//      * Set mail options
//      *
//      * @param {string | Array<string>} sendTo Emails to be sent
//      * @param {string} subject Subject of email
//      * @param {string} html Body of email
//      * @param {ISetMailAttachmentOptions[] | undefined} attachments attachments to send
//      */
//     public setMailOptions(
//         sendTo: string | Array<string>,
//         subject: string,
//         html: string,
//         attachments?: ISetMailAttachmentOptions[] | undefined
//     ): void {
//         const imageAttachment = readFileSync(path.join(rootPath, 'assets', 'logo.png'));

//         const logoAttachment = {
//             filename: 'logo.png',
//             content: imageAttachment,
//             encoding: 'base64',
//             cid: 'uniqueImageCID'
//         };
//         this.mailOptions = {
//             attachments: attachments ? [logoAttachment, ...attachments] : [logoAttachment],
//             from: this.from,
//             subject: subject,
//             html: html
//         };

//         this.mailOptions.to = sendTo;
//     }

//     /**
//      * Send email
//      *
//      * @returns {Promise<SentMessageInfo | unknown>} info of sent mail
//      */
//     public async sendMail(): Promise<SentMessageInfo> {
//         const transporter = await this.createTransport();
//         return transporter.sendMail(this.mailOptions);
//     }
// }

// import { SESv2Client, SendEmailCommand } from '@aws-sdk/client-sesv2';
import { mailConfig, rootPath } from '@config/globals';
import { readFileSync } from 'fs';
import nodemailer, { SendMailOptions, SentMessageInfo, Transporter } from 'nodemailer';
import path from 'path';

export class MailService {
    private from: string;
    private mailOptions: SendMailOptions;

    /**
     * Creates and returns a nodemailer SES transporter.
     *
     * @returns {Transporter} Nodemailer transporter configured for AWS SES
     */
    public createTransport(): Transporter {
        // const sesClient = new SESv2Client({
        //     region: String(mailConfig.SES_REGION),
        //     credentials: {
        //         accessKeyId: String(mailConfig.SES_ACCESS_KEY_ID),
        //         secretAccessKey: String(mailConfig.SES_SECRET_ACCESS_KEY)
        //     }
        // });

        // Use SES transport
        const transporter = nodemailer.createTransport({
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            // SES: { sesClient: sesClient, SendEmailCommand: SendEmailCommand }
            host: 'smtp.mailersend.net',
            port: 587,
            secure: false,
            auth: {
                user: 'MS_nZiJMn@test-r83ql3pkevmgzw1j.mlsender.net',
                pass: 'mssp.L3GFrF0.jpzkmgqpnj2l059v.R0w6lic'
            }
        });
        this.from = String(mailConfig.SES_FROM_EMAIL);
        return transporter;
    }

    /**
     * Sets the mail options including recipients, subject, HTML body, and attachments.
     *
     * @param {string | Array<string>} sendTo - Email address(es) to send to.
     * @param {string} subject - Subject of the email.
     * @param {string} html - HTML content of the email.
     * @param {ISetMailAttachmentOptions[] | undefined} attachments - Optional attachments to include.
     */
    public setMailOptions(
        sendTo: string | Array<string>,
        subject: string,
        html: string
        // attachments?: ISetMailAttachmentOptions[] | undefined
    ): void {
        const imageAttachment = readFileSync(path.join(rootPath, 'assets', 'logo.png'));
        const logoAttachment = {
            filename: 'logo.png',
            content: imageAttachment,
            encoding: 'base64',
            cid: 'uniqueImageCID'
        };

        console.log(logoAttachment, html);
        this.mailOptions = {
            // attachments: attachments ? [logoAttachment, ...attachments] : [logoAttachment],
            from: mailConfig.SES_FROM_EMAIL,
            subject: subject,
            text: 'hello test'
        };
        this.mailOptions.to = sendTo;
    }

    /**
     * Sends the email using the configured transporter and mail options.
     *
     * @returns {Promise<SentMessageInfo>} Info about the sent email.
     */
    public async sendMail(): Promise<SentMessageInfo> {
        const transporter = this.createTransport();
        console.log('email optsss', this.mailOptions);
        return transporter.sendMail(this.mailOptions);
    }
}
