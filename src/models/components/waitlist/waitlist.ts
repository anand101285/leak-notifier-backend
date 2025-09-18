import { Schema, model } from 'mongoose';
import { IWaitlistDocument } from './types';

const WaitlistSchema: Schema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        }
    },
    {
        timestamps: true
    }
);

export default model<IWaitlistDocument>('waitlist', WaitlistSchema);
