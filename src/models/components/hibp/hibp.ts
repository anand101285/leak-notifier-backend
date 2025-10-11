import { Schema, model, Document } from 'mongoose';
import { IHibpLeakDocument } from './types';

const HibpLeakSchema: Schema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'users',
            required: true
        },
        data: [
            {
                Name: { type: String },
                Title: { type: String },
                Domain: { type: String },
                BreachDate: { type: String },
                AddedDate: { type: String },
                ModifiedDate: { type: String },
                PwnCount: { type: Number },
                Description: { type: String },
                LogoPath: { type: String },
                Attribution: { type: String },
                DisclosureUrl: { type: String },
                DataClasses: [{ type: String }],
                IsVerified: { type: Boolean },
                IsFabricated: { type: Boolean },
                IsSensitive: { type: Boolean },
                IsRetired: { type: Boolean },
                IsSpamList: { type: Boolean },
                IsMalware: { type: Boolean },
                IsSubscriptionFree: { type: Boolean },
                IsStealerLog: { type: Boolean }
            }
        ]
    },
    { timestamps: true }
);

export default model<IHibpLeakDocument>('hibp_leaks', HibpLeakSchema);
