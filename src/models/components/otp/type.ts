import { Document, Model, Schema } from 'mongoose';

export interface IOTP {
    userId: Schema.Types.ObjectId;
    otpCode: string;
    hash: string;
    createdAt: Date;
    expiresAt: Date;
}

export interface IOTPDocument extends IOTP, Document {}
export interface IOTPModel extends Model<IOTPDocument> {}
