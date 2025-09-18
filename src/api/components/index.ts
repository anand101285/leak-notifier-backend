/* eslint-disable no-unused-vars */
import { Router } from 'express';
import { registerTestRoutes } from './test/routes';

/**
 * Init Express api routes
 *
 * @param {Router} router Router the routes are attached to
 * @param {string} prefix Prefix for attached routes
 * @returns {void}
 */
export function registerApiRoutes(router: Router, prefix = 'api'): void {
    registerTestRoutes(router, prefix);
}
