/* eslint-disable new-cap */
import Dao from '@models/dataAccessObject';
import { ISubscriptionDocument, ISubscriptionModel, SubscriptionType } from '@models/index';
import Subscriptions from '@models/components/subscriptions/subscriptions';
export default class SubscriptionService extends Dao<ISubscriptionModel> {
    /**
     * Constructor
     */
    constructor() {
        super(Subscriptions);
    }

    /**
     * Adds a new subscription for a user with 'free' type by default.
     * @param { string} userId - The ID of the user to subscribe.
     * @param { SubscriptionType} type - type of subscription
     * @returns {Promise<ISubscriptionDocument>} The created subscription document.
     */
    public async addSubscription(
        userId: string,
        type: SubscriptionType = SubscriptionType.Free
    ): Promise<ISubscriptionDocument> {
        const sub = new this.model({
            userId: userId,
            type: type,
            startDate: new Date(),
            endDate: undefined,
            isActive: true,
            numberOfScans: 0
        });

        await sub.save();
        return sub;
    }
}
