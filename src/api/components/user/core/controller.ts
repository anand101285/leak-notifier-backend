/* eslint-disable new-cap */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { prepareFailedResponse, prepareSuccessResponse } from '@api/baseController';
import { statusCodes } from '@config/globals';
import WaitlistService from '@services/components/waitlist/waitlist';
import { MailService } from '@services/mail/mail';
import { MailTemplates } from '@services/mail/templates';
import { bind } from 'decko';
import { NextFunction, Request, Response } from 'express';

export default class TestController {
    private waitlistService: WaitlistService = new WaitlistService();
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
    public async joinWaitlist(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> {
        try {
            const { email }: { email: string } = req.body;

            const waitlistUser = await this.waitlistService.model.findOne({ email: email });

            if (waitlistUser) {
                return prepareFailedResponse(
                    res,
                    ['This user is already in waitlist'],
                    statusCodes.CONFLICT
                );
            }

            // configure template
            const regTemplate = MailTemplates.getWaitlist();

            this.mailService.setMailOptions(email, regTemplate.subject, regTemplate.html);

            const newUser = new this.waitlistService.model({
                email: email
            });
            await newUser.save();

            // send mail
            const resD = await this.mailService.sendMail();
            return prepareSuccessResponse(res, 'Added to waitlist successfully', resD);
        } catch (err) {
            return next(err);
        }
    }
}
