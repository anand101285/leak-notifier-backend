import { Router } from 'express';
import UserCoreRoutes from './core/routes';

/**
 * Init Express api routes (Agent)
 *
 * @param {Router} router Router the routes are attached to
 * @param {string} prefix Prefix for attached routes
 * @returns {void}
 */
export function registerUserRoutes(router: Router, prefix = ''): void {
    /**
     * endpoint is compulsory because this pattern is exempt
     * from anti csrf protection.
     */
    router.use(`${prefix}/user`, new UserCoreRoutes().router);
}
