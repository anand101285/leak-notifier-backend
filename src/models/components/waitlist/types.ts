import { Document, Model } from 'mongoose';

/**
 * USERS
 *
 */
export interface IWaitlist {
    readonly email: string;
    readonly createdAt: string;
    readonly updatedAt: string;
}

export interface IWaitlistDocument extends IWaitlist, Document {}
export interface IWaitlistModel extends Model<IWaitlistDocument> {}
