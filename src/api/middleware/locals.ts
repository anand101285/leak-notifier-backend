import { globals, statusCodes } from '@config/globals';
import { UserRole } from '@customTypes/index';
import { AuthService } from '@services/auth';
import { Handler, NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { JwtPayload } from 'jsonwebtoken';
import multer from 'multer';
import { prepareFailedResponse } from '../baseController';
/**
 * Initialize instances to use
 */
const authService = new AuthService('user');
/**
 * Middleware for validating post requests
 * @returns {Handler}
 */
export function validateReqBody(): Handler {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return prepareFailedResponse(
                    res,
                    errors.array().map((arr) => arr.msg),
                    statusCodes.UNPROCESSABLE_ENTITY
                );
            }
            return next();
        } catch (err) {
            return next(err);
        }
    };
}

/**
 * Middleware for file upload
 * @returns {Handler}
 */
export function userFileUpload(): Handler {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const upload = multer({ dest: globals.UPLOAD_FOLDER });
            upload.single('file')(req, res, (err) => {
                if (err) {
                    throw new Error(err.message);
                }
                return next();
            });
        } catch (err) {
            return next(err);
        }
    };
}
/**
 * Middleware for verifying if user is authenticated.
 * @returns {Handler} Returns if resource is allowed or not
 */
export function isAuthenticated(): Handler {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            let token = undefined;
            if (req.cookies.token) {
                token = authService.decryptToken(req.cookies.token);
            }
            let decoded: boolean | JwtPayload = authService.isAuthenticated(token as string);

            if (!decoded) {
                return prepareFailedResponse(
                    res,
                    ['Unauthenticated access!'],
                    statusCodes.UNAUTHORIZED
                );
            }
            req.user = (decoded as Record<string, unknown>).user as typeof req.user;
            return next();
        } catch (err) {
            return next(err);
        }
    };
}

/**
 * Middleware for verifying user permissions from acl
 *
 * @param {Array<string>} allowedRoles Permitted roles to access the resource
 * @returns {Handler}
 */
export function isAuthorized(allowedRoles: Array<string>): Handler {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            // if role is admin then simply allow
            if (req.user.role === UserRole.Admin) return next();
            let authorized: boolean = authService.hasPermission(allowedRoles, req.user.role);
            if (!authorized) {
                /**
                 * Always usese forbidden status code for unauthorized.
                 * Check commenst in start of this file.
                 */
                return prepareFailedResponse(res, ['Unauthorized access!'], statusCodes.FORBIDDEN);
            }
            return next();
        } catch (err) {
            return next(err);
        }
    };
}
