import { IUserModel, IUserDocument } from '@models/index';
import { AuthService } from '@services/auth';
import { UtilityService } from '@services/helper/utility';
import Dao from '@models/dataAccessObject';
import { globals, statusCodes } from '@config/globals';
import { ServiceError } from '@customErrors/index';
import { UserRole } from '@customTypes/index';

export default class UserService extends Dao<IUserModel> {
    private readonly authService: AuthService = new AuthService('user');

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
     * @param {string} password user password
     * @param {string} firstName user name first
     * @param {string} lastName user name last
     * @param {string} address user address
     * @param {string} organization user organization
     * @returns {Promise<IUserDocument | null>} returns user document
     */
    public async registerAccount(
        email: string,
        password: string,
        firstName: string,
        lastName: string,
        address: string,
        organization: string
    ): Promise<IUserDocument | null> {
        const emailLowerCase = UtilityService.convertToLowercase(email);

        try {
            if (await this.model.findOne({ email: emailLowerCase })) {
                throw new ServiceError('Email already exists', statusCodes.CONFLICT);
            }
            // eslint-disable-next-line new-cap
            const user = new this.model({
                email: emailLowerCase,
                password: await UtilityService.generatHash(
                    password,
                    await UtilityService.generateSalt(globals.SALT_LENGTH)
                ),
                role: UserRole.Client,
                firstName: firstName,
                lastName: lastName,
                address: address,
                organization: organization
            });

            await user.save();

            const userDoc = await this.model.findById(user.id).select('-password');
            return userDoc;
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
