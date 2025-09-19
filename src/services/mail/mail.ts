import { mailConfig } from '@config/globals';
import { ISetMailAttachmentOptions } from '@customTypes/mail';

import { CreateEmailOptions, CreateEmailResponse, Resend } from 'resend';
export class MailService {
    private from: string;
    private mailOptions: CreateEmailOptions;

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
        html: string,
        attachments?: ISetMailAttachmentOptions[] | undefined
    ): void {
        // const imageAttachment = path.join(rootPath, 'assets', 'logo.png');
        // const logoAttachment = {
        //     path: imageAttachment,
        //     filename: 'logo.png',
        //     // eslint-disable-next-line camelcase
        //     content_id: 'uniqueImageCID'
        // };

        // console.log(logoAttachment, html);
        this.mailOptions = {
            attachments: attachments,
            from: mailConfig.RESEND_FROM_EMAIL,
            to: sendTo,
            subject: subject,
            html: html
        };
        this.mailOptions.to = sendTo;
    }

    /**
     * Sends the email using the configured transporter and mail options.
     *
     * @returns {Promise<SentMessageInfo>} Info about the sent email.
     */
    public async sendMail(): Promise<CreateEmailResponse> {
        const resend = new Resend(mailConfig.RESEND_API_KEY);
        await resend.domains.create({
            name: mailConfig.RESEND_DOMAIN,
            customReturnPath: 'outbound'
        });

        return await resend.emails.send(this.mailOptions);
        // return transporter.sendMail(this.mailOptions);
    }
}
