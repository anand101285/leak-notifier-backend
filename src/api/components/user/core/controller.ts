/* eslint-disable new-cap */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { prepareFailedResponse, prepareSuccessResponse } from '@api/baseController';
import { statusCodes } from '@config/globals';
import user from '@models/components/user/user';
import { SubscriptionType } from '@models/index';
import OTPService from '@services/components/otps/otps';
import UserService from '@services/components/user/user';
import WaitlistService from '@services/components/waitlist/waitlist';
import { MailService } from '@services/mail/mail';
import { MailTemplates } from '@services/mail/templates';
import { bind } from 'decko';
import { NextFunction, Request, Response } from 'express';

export default class TestController {
    private waitlistService: WaitlistService = new WaitlistService();
    private mailService: MailService = new MailService();
    private userService: UserService = new UserService(user);
    private otpService: OTPService = new OTPService();

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

    /**
     * Register New User
     *
     * @param {Request} req Express request
     * @param {Response} res Express response
     * @param {NextFunction} next Express next
     * @returns {Promise<Response | void>} Returns HTTP response
     */
    @bind
    public async register(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> {
        try {
            const { email }: { email: string } = req.body;

            const newUser = await this.userService.registerAccount(email, SubscriptionType.Free);

            if (!newUser) {
                return prepareFailedResponse(res, ['cannot created new user']);
            }

            const otpDoc = await this.otpService.createOTP(String(newUser?._id));

            // configure template
            const regTemplate = MailTemplates.getRegister(otpDoc.otpCode);

            this.mailService.setMailOptions(email, regTemplate.subject, regTemplate.html);

            await this.mailService.sendMail();

            return prepareSuccessResponse(res, 'User registered successfully');
        } catch (err) {
            return next(err);
        }
    }

    /**
     * Register New User
     *
     * @param {Request} req Express request
     * @param {Response} res Express response
     * @param {NextFunction} next Express next
     * @returns {Promise<Response | void>} Returns HTTP response
     */
    @bind
    public async verifyOTP(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> {
        try {
            const { otp, hash } = req.body;

            const verified = await this.otpService.verifyOTP(hash as string, otp as string);

            if (!verified) {
                return prepareFailedResponse(res, ['Cannot verify OTP, try to relogin']);
            }

            return prepareSuccessResponse(res, 'User logged in successfully');
        } catch (err) {
            return next(err);
        }
    }
}
