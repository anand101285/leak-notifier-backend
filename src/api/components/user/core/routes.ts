/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/unbound-method */

import { Router as expressRouter } from 'express';
import UserController from './controller';
import { check } from 'express-validator';
import { validateReqBody } from '@api/middleware/locals';

export default class UserCoreRoutes {
    private readonly controller: UserController = new UserController();
    public router: expressRouter = expressRouter();

    /**
     * Contructor
     */
    public constructor() {
        this.initRoutes();
    }

    /**
     * Init Agent routes
     * @returns {void}
     */
    private initRoutes(): void {
        this.router.post(
            '/waitlist',
            [check('email', 'email is required and should be valid').isEmail()],
            validateReqBody(),
            this.controller.joinWaitlist
        );
    }
}
