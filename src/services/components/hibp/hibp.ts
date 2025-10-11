import { hibpConfig, HIBPInstance } from '@config/axios';
import { logger } from '@config/logger';
import hibp from '@models/components/hibp/hibp';
import Dao from '@models/dataAccessObject';
import { HibpBreach, IHibpLeakDocument, IHibpLeakModel } from '@models/index';

/**
 * Service for interacting with the HIBP API to check for breached accounts.
 */
export default class HibpService extends Dao<IHibpLeakModel> {
    /**
     * Constructor
     * Initializes the HibpService instance.
     */
    constructor() {
        super(hibp);
    }

    /**
     * Retrieves breach information for the specified email address using the HIBP API.
     *
     * perform scan and store the data in db
     * and returns the response data containing details of any breaches associated with the email.
     *
     * @param {string} email - The email address to check for breaches.
     * @param {string} userId - id of user running scan
     * @returns {Promise<HibpBreach[]>} A promise that resolves with the breach data for the given email.
     * @throws {Error} Throws an error if the API request fails.
     */
    public async runScan(email: string, userId: string): Promise<IHibpLeakDocument | undefined> {
        try {
            console.log('initiating scan for ', email);

            const leaks = await this.getLeaks(email);
            console.log('scan done', leaks);
            // eslint-disable-next-line new-cap
            const leak = new this.model({
                userId: userId,
                data: leaks
            });
            await leak.save();
            console.log('scan saved', leak);
            return leak;
        } catch (error) {
            logger.error(error);
            return undefined;
        }
    }

    /**
     * Retrieves breach information for the specified email address using the HIBP API.
     *
     * Makes a GET request to the `breachedaccount/<email>?truncateResponse=false` endpoint
     * and returns the response data containing details of any breaches associated with the email.
     *
     * @param {string} email - The email address to check for breaches.
     * @returns {Promise<HibpBreach[]>} A promise that resolves with the breach data for the given email.
     * @throws {Error} Throws an error if the API request fails.
     */
    public async getLeaks(email: string): Promise<HibpBreach[] | undefined> {
        try {
            const response = await HIBPInstance.get<HibpBreach[]>(
                `breachedaccount/${encodeURIComponent(email)}?truncateResponse=false`,
                hibpConfig
            );
            return response.data;
        } catch (error) {
            console.log(error);
            logger.error(error);
            return undefined;
        }
    }
}
