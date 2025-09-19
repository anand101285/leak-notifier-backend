import { getWaitlistTemplate } from './emailBody';

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
     * Get Waitlist template
     *
     * @returns {object} subject, html and test
     */
    public static getWaitlist(): TemplateObjects {
        return {
            subject: 'Welcome aboard! Your waitlist spot is saved',
            html: getWaitlistTemplate(),
            text: undefined
        };
    }
}
