import { Schema, model } from 'mongoose';
import { SubscriptionType, ISubscriptionDocument } from './types';

const SubscriptionSchema: Schema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    type: {
        type: String,
        enum: Object.values(SubscriptionType),
        default: SubscriptionType.Free,
        required: true
    },
    startDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    endDate: {
        type: Date,
        required: false
    },
    isActive: {
        type: Boolean,
        default: true
    },
    numberOfScans: {
        type: Number,
        default: 0,
        required: true
    }
});

export default model<ISubscriptionDocument>('subscriptions', SubscriptionSchema);
