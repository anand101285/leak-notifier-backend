import { UserRole } from '@customTypes/index';
import { Document, Model } from 'mongoose';

/**
 * USERS
 *
 */
export interface IUser {
    readonly email: string;
    readonly role: UserRole;
}

export interface IUserDocument extends IUser, Document {}
export interface IUserModel extends Model<IUserDocument> {}
