import { Notifications, UserRole } from '@customTypes/index';
import { Document, Model } from 'mongoose';

/**
 * USERS
 *
 */
export interface IUser {
    readonly email: string;
    readonly password: string;
    readonly role: UserRole;
    readonly firstName: string;
    readonly lastName: string;
    readonly avatar?: string;
    readonly avatarFileName?: string;
    readonly date: Date;
    readonly organization: string;
    readonly address: string;
    readonly allowedNotifications: Array<Notifications>;
}

export interface IUserDocument extends IUser, Document {}
export interface IUserModel extends Model<IUserDocument> {}
