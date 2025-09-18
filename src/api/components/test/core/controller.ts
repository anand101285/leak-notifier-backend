import { prepareSuccessResponse } from '@api/baseController';
import { MailService } from '@services/mail/mail';
import { MailTemplates } from '@services/mail/templates';
import { bind } from 'decko';
import { NextFunction, Request, Response } from 'express';

export default class TestController {
    private mailService: MailService = new MailService();

    /**
     * Get All agents
     *
     * @param {Request} req Express request
     * @param {Response} res Express response
     * @param {NextFunction} next Express next
     * @returns {Promise<Response | void>} Returns HTTP response
     */
    @bind
    public async testApi(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> {
        try {
            const regTemplate = MailTemplates.getRegistration('test asda');

            this.mailService.setMailOptions(
                'anand.talreja0@gmail.com',
                regTemplate.subject,
                regTemplate.html
            );

            await this.mailService.sendMail();

            return prepareSuccessResponse(res, 'api working correctly', 'read');
        } catch (err) {
            console.log('error is ', err);
            return next(err);
        }
    }
}
