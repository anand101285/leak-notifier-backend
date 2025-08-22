/* eslint-disable @typescript-eslint/prefer-regexp-exec */
import { logger } from '@config/logger';
import { Handler } from 'express';
import { compare, genSalt, hash } from 'bcrypt';
import { randomBytes, createHash, createCipheriv, createDecipheriv } from 'crypto';
import generator from 'generate-password';
import { globals } from '@config/globals';
import moment from 'moment';
import { URL } from 'url';

type Headers = {
    headers: Record<string, unknown>;
    method: string;
    url: string;
    data: Record<string, unknown> | Array<Record<string, unknown>>;
};

// eslint-disable-next-line no-unused-vars
type ExtractorType = (str: string) => Array<string> | null | undefined;

/**
 * UtilityService
 *
 * Service for utility functions
 */
export class UtilityService {
    /**
     * Error handler
     *
     * @param {Error} err Any Error generated
     * @returns {void}
     */
    public static handleError(err: Error): void {
        logger.error(err.stack || err);
    }

    /**
     * Exceptional paths.
     *
     * @param {Handler} middleware Csrf Middleware.
     * @param {Array<RegExp>} paths Array of Regular Expressions
     * @returns {Handler} returns Handler
     */
    public static unless(middleware: Handler, ...paths: Array<RegExp>): Handler {
        return (req, res, next) => {
            try {
                const pathCheck = paths.some((path) => {
                    return path.test(req.path);
                });
                if (pathCheck) {
                    return next();
                }
                return middleware(req, res, next);
            } catch (err) {
                return middleware(req, res, next);
            }
        };
    }

    /**
     * Try to parse Json.
     *
     * @param {string} str string to be parsed.
     * @returns {any} returns Any type of data
     */
    public static tryParseJson(str: string): unknown {
        try {
            if (!(str && typeof str === 'string')) {
                return null;
            }
            return JSON.parse(str);
        } catch (err) {
            return null;
        }
    }

    /**
     * Sleep
     *
     * @param {number} ms milliseconds
     * @returns {Promise<unknown>}
     */
    public static async sleep(ms: number): Promise<unknown> {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }

    /**
     * Compare Plain text with its hash
     * @param {string} plain Plain text to compare
     * @param {string} plainHash Hashed text of plain to be compared with
     * @returns {Promise<boolean>} Returns async boolean
     */
    public static comparePlainTextWithHash(plain: string, plainHash: string): Promise<boolean> {
        return compare(plain, plainHash);
    }

    /**
     * Generate salt
     * @param {string} length Plain text to compare
     * @returns {Promise<string>} Returns async salted string
     */
    public static generateSalt(length: number): Promise<string> {
        return genSalt(length);
    }

    /**
     * Generate hash
     * @param {string} textToBeHashed Text to be hashed
     * @param {string} salt Salt to be hashed with
     * @returns {Promise<string>} Returns async hashed string
     */
    public static generatHash(textToBeHashed: string, salt: string): Promise<string> {
        return hash(textToBeHashed, salt);
    }

    /**
     * Generate random hex
     * @param {number} noOfBytes number of bytes to generate, default 32
     * @returns {Promise<string>} Returns async hashed string
     */
    public static generateRandomHex(noOfBytes = Number(globals.DEFAULT_RANDOM_BYTES)): string {
        return randomBytes(noOfBytes).toString('hex');
    }

    /**
     * Generate random string
     * @returns {string} Returns random string
     */
    public static generateRandomString(): string {
        return generator.generate({
            length: 8,
            numbers: true,
            uppercase: true
        });
    }

    /**
     * Enrypt string
     * @param {string} str String to be encrypted
     * @returns {Promise<IUserDocument>} Get updated notification status
     */
    public static async encrypt(str: string): Promise<string> {
        try {
            return this.generatHash(str, await this.generateSalt(globals.SALT_LENGTH));
        } catch (err) {
            throw new Error((err as Error).message);
        }
    }

    /**
     * Extract data from email
     * @param {string} beg Port binding
     * @param {string} end Port binding
     * @returns {void}
     */
    public static extract(beg: string, end: string): ExtractorType {
        const minusOne = -1;
        const matcher = new RegExp(`${beg}(.*)${end}`, 'gm');
        const normalise = (str: string) => {
            return str.slice(beg.length, end.length * minusOne);
        };
        return (str: string): Array<string> | null | undefined => {
            if (str.match(matcher)) {
                return str.match(matcher)?.map(normalise);
            }
            return null;
        };
    }

    /**
     * Construct headers for axios request
     * @param {string} token auth token
     * @param {string} method auth token
     * @param {string} url auth token
     * @param {Record<string, unknown>} data auth token
     * @returns {Headers} Get updated notification status
     */
    public static constructRequest(
        token: string,
        method: string,
        url: string,
        data: Record<string, unknown> | Array<Record<string, unknown>>
    ): Headers {
        try {
            return {
                headers: {
                    'Content-Type': ' application/json',
                    'x-auth-token': token // req.header("x-auth-token"),
                },
                method: method,
                url: url,
                data: data
            };
        } catch (err) {
            throw new Error((err as Error).message);
        }
    }

    /**
     * Make text human readable
     * @param {string} str text to be humanized
     * @returns {string}
     */
    public static humanize(str: string): string {
        const frags = str.split('_');
        for (let index = 0; index < frags.length; index++) {
            const zero = 0,
                one = 1;
            frags[index] = frags[index].charAt(zero).toUpperCase() + frags[index].slice(one);
        }
        return frags.join(' ');
    }

    /**
     * Make text human readable
     * @param {string} str to be humanized
     * @returns {string}
     */
    public static humanizeCapitalize(str: string): string {
        const frags = str.split('_');
        for (let index = 0; index < frags.length; index++) {
            frags[index] = frags[index].toUpperCase();
        }
        return frags.join(' ');
    }

    /**
     * Check if Url is valid
     * @param {string} string to be parsed
     * @returns {string} URL object
     */
    public static isValidHttpUrl = (string: string): URL | boolean => {
        try {
            return new URL(string);
            return false;
        } catch (err) {
            return false;
        }
    };

    /**
     * AES Encryption
     * @param {string} plainText Plain text to be encrypted
     * @param {string} key Key to be used in encryption
     * @param {string} cipherAlgo Algo used to create cipher iv
     * @param {string} hashingAlgo used for hashing the key
     * @returns {{ iv: string, encryptedData: string }} in hex form
     */
    public static aesEncrypt(
        plainText: string,
        key: string,
        cipherAlgo: string,
        hashingAlgo: string
    ): {
        iv: string;
        encryptedData: string;
    } {
        try {
            const zero = 0;
            const sixteen = 16;
            const encryptKey = createHash(hashingAlgo).update(key).digest('hex');
            const iv = encryptKey.substring(zero, sixteen);
            const cipher = createCipheriv(cipherAlgo, encryptKey, iv);
            let encrypted = cipher.update(plainText);
            encrypted = Buffer.concat([encrypted, cipher.final()]);
            return { iv: iv.toString(), encryptedData: encrypted.toString('hex') };
        } catch (err) {
            throw new Error((err as Error).message);
        }
    }

    /**
     * AES Decryption
     * @param {string} plainText Plain text to be decrypted
     * @param {string} key Key to be used in decryption
     * @param {string} cipherAlgo Algo used to create cipher iv
     * @param {string} hashingAlgo used for hashing the key
     * @returns {string} decrpted data
     */
    public static aesDecrypt(
        plainText: string,
        key: string,
        cipherAlgo: string,
        hashingAlgo: string
    ): string {
        try {
            const zero = 0;
            const sixteen = 16;
            const decryptKey = createHash(hashingAlgo).update(key).digest('hex');
            const iv = decryptKey.substring(zero, sixteen);
            const encryptedText = Buffer.from(plainText, 'hex');
            const decipher = createDecipheriv(cipherAlgo, decryptKey, iv);
            let decrypted = decipher.update(encryptedText);
            decrypted = Buffer.concat([decrypted, decipher.final()]);
            return decrypted.toString();
        } catch (err) {
            throw new Error((err as Error).message);
        }
    }

    /**
     * Delete Schedule by Id
     * @param {string} time date time value to be checked
     * @returns {boolean}
     */
    public static timeIsAfterMinimumOneMinute(time: string): boolean {
        try {
            const one = 1;
            const oneMinutreFromNow = moment().add(moment.duration(one, 'm')).format();
            if (moment(time).format() > oneMinutreFromNow) {
                return true;
            }
            return false;
        } catch (err) {
            throw new Error((err as Error).message);
        }
    }

    /**
     * Divide array into chunks of fix size
     * @param {Array<unknown>} items array to be divided
     * @param {number} size size in which array is to be divided
     * @returns {Array<Array<unknown>>}
     */
    public static arrayToChunks(items: Array<unknown>, size: number): Array<Array<unknown>> {
        const zero = 0;
        const chunks = [];

        /**
         * As it is aray it will be modified
         * in calling function as well so making
         * a deep copy to mimic "pass by value"
         */
        const oiginalItems = [...items];

        while (oiginalItems.length) {
            chunks.push(oiginalItems.splice(zero, size));
        }
        return chunks;
    }

    /**
     * convert str to lowercase
     * @param {string} str string will convert to lowercase
     * @returns {Promise<string>} Returns str in lowercase
     */
    public static convertToLowercase(str: string): string {
        return str.toLowerCase();
    }

    /**
     * Check if url is encoded
     *
     * @param {string} uri - url to be checked
     * @returns {boolean} - True if the object is a uri encoded, false otherwise
     */
    public static isComponentURIEncoded(uri: string): boolean {
        try {
            const url = uri;
            return url !== decodeURIComponent(url);
        } catch (err) {
            return false;
        }
    }

    /**
     * Check if url is encoded
     *
     * @param {string} uri - url to be decoded
     * @returns {string} - True if the object is a uri encoded, false otherwise
     */
    public static fullyDecodeURIComponent(uri: string): string {
        let url = uri;
        while (this.isComponentURIEncoded(url)) {
            url = decodeURIComponent(uri);
        }
        return url;
    }
}
