/* eslint-disable max-len */
import { branding } from '@config/globals';
import { footer, header } from './emailLayout';
import { IContactUsTempalate, IRegistrationProps } from './types';

const getRegistrationTemplate = ({ firstName, verificationLink }: IRegistrationProps) => {
    return `${header}
        <h2>Thank You for Registering!</h2>
        <p>Dear ${firstName},</p>
        <p>Thank you for registering with us! Your account has been successfully created.</p>
        <p>PLease visit the following link to activate you account.</p>
        <a href="${verificationLink}">Verify</a>
        <p>If you have any questions, feel free to contact our support team at any time.</p>
        <p>Best regards,<br>${branding.BRAND_NAME}</p>
         ${footer}`;
};

const getContactUsTemplate = ({
    name,
    email,
    company,
    description,
    message,
    services,
    contact
}: IContactUsTempalate) => {
    return `${header}
        <h2>Contact Us Submission</h2>
        <p>Dear user there has been submission of contact us form</p>
        <h3>Details:</h3>
        <p><strong> Name:</strong> ${name}</p>
        <p><strong> Email:</strong> ${email}</p>
        <p><strong> Company:</strong> ${company}</p>
        <p><strong> Description:</strong> ${description}</p>
        <p><strong> Message:</strong> ${message}</p>
        <p><strong> Contact:</strong> ${contact}</p>
        <p><strong> Services:</strong> ${services?.join(',')}</p>
         ${footer}`;
};

export { getContactUsTemplate, getRegistrationTemplate };
