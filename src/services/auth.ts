import { sign, SignOptions, verify, JwtPayload } from 'jsonwebtoken';
import { globals } from '@config/globals';
import { UtilityService } from '@services/helper/utility';

/**
 * AuthService
 */

export class AuthService {
    private readonly secretKey: string = globals.JWT_SECRET as string;
    private readonly cipherAlgo = 'aes-256-cbc';
    private readonly hashingAlgo = 'md5';
    public readonly agentJWTKey = globals.AGENT_CMD_JWT_SECRET as string;

    // JWT options
    private signOptions: SignOptions;

    /**
     * Constructor
     * @param {string} entity "user", "agent" or "resetPassword"
     */
    constructor(entity: string) {
        if (entity === 'user') {
            this.signOptions = {
                expiresIn: globals.JWT_USER_EXPIRY
            };
        } else if (entity === 'agent') {
            this.signOptions = {
                expiresIn: globals.JWT_AGENT_EXPIRY
            };
        } else {
            throw new Error('Entity not available!');
        }
    }

    /**
     * Create JWT
     * @param {Record<string, unknown>} payload Used for JWT payload
     * @returns {string} Returns JWT
     * String cannot have expiry set so therefore we are using
     * no options for string payloads
     */
    public createToken(payload: Record<string, unknown> | string): string {
        if (typeof payload === 'string') {
            return sign(payload, this.secretKey);
        }
        return sign(payload, this.secretKey, this.signOptions);
    }

    /**
     * Verify JWT
     * @param {string} token Used for JWT payload
     * @returns {object} Returns JWT
     */
    public verifyToken(token: string): JwtPayload {
        const verified = verify(token, globals.JWT_SECRET as string) as JwtPayload;
        return verified;
    }

    /**
     * Middleware for verifying user permissions from acl
     * @param {Array<string>} allowedRoles Permitted roles to access the resource
     * @param {string} userRole role of user
     * @returns {boolean} Returns if resource is allowed or not
     */
    public hasPermission(allowedRoles: Array<string>, userRole: string): boolean {
        if (allowedRoles.indexOf(userRole) !== globals.NOT_FOUND) {
            return true;
        }
        return false;
    }

    /**
     * Verify user token from cookies
     * @param {string | boolean} token main token
     * @returns {boolean} Returns false if not authenticated else returns decode payload
     */
    public isAuthenticated(token: string | boolean): boolean | JwtPayload {
        try {
            if (!token) {
                return false;
            }
            return this.verifyToken(token as string);
        } catch (err) {
            return false;
        }
    }

    /**
     * Verify agent Token from cookies
     * @param {string} decryptedToken decrypted token of agent
     * @param {string} mac mac of agent
     * @param {string} systemName systemName of agent
     * @returns {boolean} Returns false if not authenticated else returns decode payload
     */
    public agentIsAuthenticated(decryptedToken: string): JwtPayload {
        try {
            return this.verifyToken(decryptedToken);
        } catch (err) {
            throw new Error((err as Error).message);
        }
    }

    /**
     * Encrypt token
     * @param {string} token auth token of an agent
     * @returns {{ iv: string, encryptedData: string }} Get ecrypted data
     */
    public encryptToken(token: string): {
        iv: string;
        encryptedData: string;
    } {
        try {
            return UtilityService.aesEncrypt(
                token,
                globals.SERVER_SECRET as string,
                this.cipherAlgo,
                this.hashingAlgo
            );
        } catch (err) {
            throw new Error((err as Error).message);
        }
    }

    /**
     * Decrypt token
     * @param {string} token auth token of an agent
     * @returns {string} Get decrypted data
     */
    public decryptToken(token: string): string {
        try {
            return UtilityService.aesDecrypt(
                token,
                globals.SERVER_SECRET as string,
                this.cipherAlgo,
                this.hashingAlgo
            );
        } catch (err) {
            throw new Error((err as Error).message);
        }
    }

    /**
     * Encrypt agent token
     * @param {string} token auth token of an agent
     * @param {string} key key to be encrypt with
     * @returns {{ iv: string, encryptedData: string }} Get ecrypted data
     */
    public encryptAgentToken(
        token: string,
        key: string
    ): {
        iv: string;
        encryptedData: string;
    } {
        try {
            return UtilityService.aesEncrypt(token, key, this.cipherAlgo, this.hashingAlgo);
        } catch (err) {
            throw new Error((err as Error).message);
        }
    }

    /**
     * Decrypt agent token
     * @param {string} token auth token of an agent
     * @param {string} key key to be decrypt with
     * @returns {string} Get decrypted data
     */
    public decryptAgentToken(token: string, key: string): string {
        try {
            return UtilityService.aesDecrypt(token, key, this.cipherAlgo, this.hashingAlgo);
        } catch (err) {
            throw new Error((err as Error).message);
        }
    }
}
