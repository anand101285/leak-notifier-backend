import { statusCodes } from '@config/globals';
import { ServiceError } from '@customErrors/index';
import { UserRole } from '@customTypes/index';
import Dao from '@models/dataAccessObject';
import { IUserDocument, IUserModel, SubscriptionType } from '@models/index';
import { AuthService } from '@services/auth';
import { UtilityService } from '@services/helper/utility';
import SubscriptionService from '../subscriptions/subscription';

export default class UserService extends Dao<IUserModel> {
    private readonly authService: AuthService = new AuthService('user');
    private readonly subscriptionService: SubscriptionService = new SubscriptionService();

    /**
     * Constructor
     * @param {IUserModel} model User Db Model
     */
    constructor(model: IUserModel) {
        super(model);
    }
    /**
     * Register user
     * @param {string} email email address
     * @param {SubscriptionType} subscriptionType user password
     * @param {string} firstName user name first
     * @param {string} lastName user name last
     * @param {string} address user address
     * @param {string} organization user organization
     * @returns {Promise<IUserDocument | null>} returns user document
     */
    public async registerAccount(
        email: string,
        subscriptionType: SubscriptionType
    ): Promise<IUserDocument | null> {
        try {
            const emailLowerCase = UtilityService.convertToLowercase(email);
            if (await this.model.findOne({ email: emailLowerCase })) {
                throw new ServiceError('Email already exists', statusCodes.CONFLICT);
            }

            // create uer model
            // eslint-disable-next-line new-cap
            const user = new this.model({
                email: emailLowerCase,
                role: UserRole.Client
            });

            await user.save();

            await this.subscriptionService.addSubscription(String(user._id), subscriptionType);

            return user;
        } catch (err) {
            throw new ServiceError((err as Error).message, statusCodes.SERVER_ERROR);
        }
    }
    /**
     * Get All Users
     * @returns {Promise<IUserDocument[]>} Get Users Array
     */
    public async getAllUsers(): Promise<IUserDocument[]> {
        try {
            return await this.model.find({});
        } catch (err) {
            throw new Error((err as Error).message);
        }
    }

    /**
     * Encode password reset token
     * @param {string} id id of user
     * @returns {string} Get encoded token
     */
    public encodePasswordResetToken(id: string): string {
        try {
            const authService: AuthService = new AuthService('resetPassword');
            const hex = UtilityService.generateRandomHex();

            return authService.createToken({
                value: hex,
                id: id
            });
        } catch (err) {
            throw new Error((err as Error).message);
        }
    }

    /**
     * Decode password reset token
     * @param {string} token Token to be decoded
     * @returns {{value: string, id: string}} Get decoded token
     */
    public decodePasswordResetToken(token: string): { value: string; id: string } {
        try {
            const authService = new AuthService('user');
            const verifiedToken = authService.verifyToken(token);
            return { value: verifiedToken.value as string, id: verifiedToken.id as string };
        } catch (err) {
            throw new Error((err as Error).message);
        }
    }

    /**
     * Generate random user password
     * @returns {string} random password of length = 8
     */
    public generateUserPassword(): string {
        try {
            return UtilityService.generateRandomString();
        } catch (err) {
            throw new Error((err as Error).message);
        }
    }

    /**
     * Extract user payload
     * @param {IUserDocument} doc User Db Model
     * @param {boolean} msalLogin msal login
     * @returns {Record<string, unknown>} Get Users Array
     */
    public extractPayload(doc: IUserDocument): Record<string, unknown> {
        try {
            return {
                user: {
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    id: doc.id,
                    role: doc.role
                }
            };
        } catch (err) {
            throw new Error((err as Error).message);
        }
    }
}
