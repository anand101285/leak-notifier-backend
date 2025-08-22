import { Schema, model } from 'mongoose';
import { IUserDocument } from './types';
import { Notifications, UserRole } from '@customTypes/index';

const UserSchema: Schema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        trim: true,
        required: true
    },
    lastName: {
        type: String,
        trim: true,
        default: ''
    },
    address: {
        type: String,
        required: true
    },
    organization: {
        type: String,
        trim: true,
        required: true
    },
    role: {
        type: String,
        enum: UserRole,
        default: UserRole.Client,
        required: true
    },
    avatar: {
        type: String
    },
    avatar_file_name: {
        type: String
    },
    allowedNotifications: {
        type: [String],
        enum: Notifications,
        default: [Notifications.Alerts, Notifications.Info, Notifications.Honeypots]
    }
});

export default model<IUserDocument>('users', UserSchema);
