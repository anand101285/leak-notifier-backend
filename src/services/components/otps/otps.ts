import Otp from '@models/components/otp/otp';
import Dao from '@models/dataAccessObject';
import { IOTPDocument, IOTPModel } from '@models/index';
import crypto from 'crypto';

export default class OTPService extends Dao<IOTPModel> {
    /**
     * Initializes the OTPService with the Otp model.
     */
    constructor() {
        super(Otp);
    }

    /**
     * Generates a unique hash of a random string (20-25 characters).
     * @returns {string} hash
     */
    generateUniqueHash(): string {
        const randomStr = crypto.randomBytes(18).toString('hex'); // ~36 chars, slice to 25
        return crypto.createHash('sha256').update(randomStr).digest('hex').slice(0, 25);
    }

    /**
     * Creates an OTP for a user, returns the created OTP document.
     * @param {string} userId - The user's ObjectId
     */
    async createOTP(userId: string): Promise<IOTPDocument> {
        const otpCode = Math.floor(10000 + Math.random() * 90000).toString(); // 5 digit OTP
        const hash = this.generateUniqueHash();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // OTP expires in 10 minutes

        // remove all other codes if new generated
        await this.model.deleteMany({ userId: userId });

        const otpDoc = await this.model.create({
            userId: userId,
            otpCode: otpCode,
            hash: hash,
            expiresAt: expiresAt,
            createdAt: new Date()
        });

        return otpDoc;
    }

    /**
     * Verifies an OTP for a user by hash and code.
     * @param {string} hash - The hash to verify
     * @param {string} otpCode - The OTP code to verify
     */
    async verifyOTP(hash: string, otpCode: string): Promise<boolean> {
        const otpDoc = await this.model.findOne({ hash: hash, otpCode: otpCode });
        if (!otpDoc) {
            return false;
        }
        if (otpDoc.expiresAt < new Date()) {
            return false;
        }
        return true;
    }
}
