import { getRegistrationTemplate } from './emailBody';

interface TemplateObjects {
    subject: string;
    html: string;
    text?: string;
    attachments?: Record<string, unknown>[];
}

/**
 * Mail Templates
 *
 * Service for sending emails
 */
export class MailTemplates {
    /**
     * Get registration template
     *
     * @param {string} firstName First name
     * @param {string} emailToken Email verification token
     * @returns {object} subject, html and test
     */
    public static getRegistration(firstName: string): TemplateObjects {
        return {
            subject: 'Your account has been created',
            html: getRegistrationTemplate({
                firstName: firstName, // prevent injection attacks
                verificationLink: `url here`
            }),
            text: undefined
        };
    }
}
