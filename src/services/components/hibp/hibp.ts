import { HIBPInstance } from '@config/axios';
import { logger } from '@config/logger';

/**
 * Represents a single breach record returned from the HIBP API.
 */
export type HibpBreach = {
    Name: string;
    Title: string;
    Domain: string;
    BreachDate: string;
    AddedDate: string;
    ModifiedDate: string;
    PwnCount: number;
    Description: string;
    LogoPath: string;
    Attribution: string;
    DisclosureUrl: string | null;
    DataClasses: string[];
    IsVerified: boolean;
    IsFabricated: boolean;
    IsSensitive: boolean;
    IsRetired: boolean;
    IsSpamList: boolean;
    IsMalware: boolean;
    IsSubscriptionFree: boolean;
    IsStealerLog: boolean;
};

/**
 * Service for interacting with the HIBP API to check for breached accounts.
 */
export default class HibpService {
    /**
     * Constructor
     * Initializes the HibpService instance.
     */
    constructor() {
        // No initialization required for now
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
                `breachedaccount/${encodeURIComponent(email)}?truncateResponse=false`
            );
            return response.data;
        } catch (error) {
            logger.error(error);
            return undefined;
        }
    }
}
