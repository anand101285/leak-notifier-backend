import { Schema, model } from 'mongoose';
import { IUserDocument } from './types';
import { UserRole } from '@customTypes/index';

const UserSchema: Schema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: UserRole,
        default: UserRole.Client,
        required: true
    }
});

export default model<IUserDocument>('users', UserSchema);
