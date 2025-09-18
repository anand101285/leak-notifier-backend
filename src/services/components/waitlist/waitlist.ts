import Dao from '@models/dataAccessObject';
import { IWaitlistModel } from '@models/index';
import WaitList from '@models/components/waitlist/waitlist';

export default class WaitlistService extends Dao<IWaitlistModel> {
    /**
     * Constructor
     * @param {IWaitlistModel} model User Db Model
     */
    constructor() {
        super(WaitList);
    }
}
