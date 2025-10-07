import { Schema, model, Document } from 'mongoose';
import { IOTPDocument } from './type';

const OtpSchema: Schema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    otpCode: {
        type: String,
        required: true
    },
    hash: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    },
    expiresAt: {
        type: Date,
        required: true
    }
});

export default model<IOTPDocument>('otps', OtpSchema);
