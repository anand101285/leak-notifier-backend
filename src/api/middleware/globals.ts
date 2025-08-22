import { NextFunction, Request, Response, Router } from 'express';
import { UtilityService } from '@services/helper/utility';
import { statusCodes, globals } from '@config/globals';
import { ServiceError } from '@customErrors/index';
import { prepareFailedResponse, prepareSuccessResponse } from '../baseController';
// import csrf from 'csurf';
import { Environment } from '@customTypes/index';
import { sign } from 'jsonwebtoken';

const mongooseErrors = [
    'CastError',
    'DisconnectedError',
    'DivergentArrayError',
    'MissingSchemaError',
    'DocumentNotFoundError',
    'ObjectExpectedError',
    'ObjectParameterError',
    'OverwriteModelError',
    'ParallelSaveError',
    'StrictModeError',
    'VersionError'
];

// /*
// Anti Csrf, apply on all methods
// */
// const csrfProtection = csrf({
// 	cookie: true,
// 	ignoreMethods: globals.CSRF_IGNORE_METHODS,
//   });

/**
 * Init Express error handler
 *
 * @param {Router} router Express Router
 * @returns {void}
 */
export function registerErrorHandler(router: Router): void {
    router.use((err: ServiceError, req: Request, res: Response, next: NextFunction) => {
        UtilityService.handleError(err);
        if (globals.ENV !== Environment.Production) {
            return prepareFailedResponse(
                res,
                [err.message as string],
                err.statusCode || statusCodes.SERVER_ERROR
            );
        } else {
            if (err.name === 'MongoError' && (err as any).code == 11000) {
                return prepareFailedResponse(
                    res,
                    ['Record Already Exist'],
                    err.statusCode || statusCodes.SERVER_ERROR
                );
            } else if (mongooseErrors.includes(err.name)) {
                return prepareFailedResponse(
                    res,
                    ['Internal Server Error. Please try again later.'],
                    err.statusCode || statusCodes.SERVER_ERROR
                );
            } else {
                return prepareFailedResponse(
                    res,
                    [err.message as string],
                    err.statusCode || statusCodes.SERVER_ERROR
                );
            }
        }
    });
}

export function sleep(ms: number) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

/**
 * Format configuration of key=a, key2=b
 * to {key1:a,key2:b}
 *
 * @param {string} inputString
 * @returns {Object} formated object
 */
export function parseKeyValueStringToObj(inputString: string) {
    const keyValuePairs = inputString.split(','); // Split the string by commas
    const parsedObject: Record<string, unknown> = {};

    for (const pair of keyValuePairs) {
        const [key, value] = pair.split('='); // Split each key-value pair
        parsedObject[key] = value; // Assign the key and value to the object
    }

    return parsedObject;
}

export function parseObjectToKeyValueString(obj: Record<string, unknown>) {
    const arr = Object.keys(obj).map((key) => {
        return `${key}=${obj[key]}`;
    });
    return arr.join(',');
}

export function formatSecondsToTime(seconds: number): string {
    let sec = seconds;
    //days
    const days = Math.floor(seconds / (24 * 3600));
    sec = sec - days * 24 * 3600;

    //hours
    const hours = Math.floor(sec / 3600);
    sec = sec - hours * 3600;

    //minutes
    const minutes = Math.floor(sec / 60);
    sec = sec - minutes * 60;

    return `${days} days ${hours.toLocaleString('en-US', {
        minimumIntegerDigits: 2
    })}:${minutes.toLocaleString('en-US', {
        minimumIntegerDigits: 2
    })}:${sec.toLocaleString('en-US', {
        minimumIntegerDigits: 2
    })}`;
}
/**
 * encode for agent commands
 *
 * @param {Record<string, unknown>} payload Used for JWT payload
 * @returns {string} Returns JWT
 *
 */
export function encodeWithJWT(payload: Record<string, unknown> | string): string {
    return sign(payload, globals.AGENT_CMD_JWT_SECRET as string);
}

export function isValidJson(data: string): boolean {
    try {
        JSON.parse(data);
    } catch (err) {
        return false;
    }
    return true;
}

// /**
//  * Init Anti Csrf Protection
//  *
//  * @param {Router} router Express Router
//  * @returns {void}
//  */
//  export function registerAntiCsrfProtection(router: Router, prefix = ''): void {
// 	router.use(UtilityService.unless(
// 		csrfProtection,
// 		new RegExp(`${prefix}/user/is-valid-token+`),
// 		new RegExp(`${prefix}/email-gateway/report/+`),
// 		/**
// 		 * Only apis called by our agents should be
// 		 * exempt from csrf. So they all are starting from
// 		 * /api/agent/endpoint* url.
// 		 */
// 		new RegExp(`${prefix}/agent/endpoint/+`)
// 	));

// 	/**
//     * csrf token api should
//     * be registered after
//     * anti csrf middleware
//     * has been registered
//     */
// 	 router.get(`${prefix}/csrf/`, (req, res) => {
//         return prepareSuccessResponse(res, 'Got anti CSRF token successfully', { csrfToken: req.csrfToken() }, 'read');
// 	 });

// 	router.use(function (err: Error, req: Request, res: Response, next: NextFunction) {
// 		if ((err as any).code !== "EBADCSRFTOKEN") return next(err);
// 		return prepareFailedResponse(res, ["Forbidden Request"], statusCodes.UNAUTHORIZED);
// 	  });
// }
