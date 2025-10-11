import { Document, Model, Schema } from 'mongoose';

export type HibpBreach = {
    Name: string;
    Title: string;
    Domain: string;
    BreachDate: string;
    AddedDate: string;
    ModifiedDate: string;
    PwnCount: number;
    Description: string;
    LogoPath: string;
    Attribution: string;
    DisclosureUrl: string | null;
    DataClasses: string[];
    IsVerified: boolean;
    IsFabricated: boolean;
    IsSensitive: boolean;
    IsRetired: boolean;
    IsSpamList: boolean;
    IsMalware: boolean;
    IsSubscriptionFree: boolean;
    IsStealerLog: boolean;
};

export interface IHibpLeak {
    userId: Schema.Types.ObjectId;
    data: HibpBreach[];
}

export interface IHibpLeakDocument extends IHibpLeak, Document {}
export interface IHibpLeakModel extends Model<IHibpLeakDocument> {}
