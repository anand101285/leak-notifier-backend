/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/unbound-method */

import { Router as expressRouter } from 'express';
import TestController from './controller';

export default class TestCoreRoutes {
    private readonly controller: TestController = new TestController();
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
        this.router.get('/', this.controller.testApi);
    }
}
