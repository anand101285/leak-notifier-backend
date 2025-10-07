import { Document, Model, Schema } from 'mongoose';

export enum SubscriptionType {
    Free = 'Free',
    Basic = 'Basic',
    Premium = 'Premium'
}

export interface ISubscription {
    userId: Schema.Types.ObjectId;
    type: SubscriptionType;
    startDate: Date;
    endDate: Date;
    isActive: boolean;
    numberOfScans: number;
}

export interface ISubscriptionDocument extends ISubscription, Document {}
export interface ISubscriptionModel extends Model<ISubscriptionDocument> {}
