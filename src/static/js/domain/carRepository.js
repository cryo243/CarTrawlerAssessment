import {WebStorage} from "../utilities/webStorage.js";
import {getCarDetails} from "../apis/carApis.js";

const CAR_DETAILS_KEY = 'CAR_DETAILS_KEY';
let instance;

export class CarRepository {
    constructor() {
        if (!instance) {
            instance = this;
            this.storage = new WebStorage();
        }
        return instance;
    }
    /**
     * @function - getCarData
     * @description:  Get the car details from the repo
     * It performs a cache first check
     * If the data from the cache is too old (in this case more than 30 seconds) or if it is not present,
     * it will perform a network call through the getCarDetails api
     * @return Promise that resolves with the the car details
     */
    async getCarData() {
        try {
            let data = this.storage.get(CAR_DETAILS_KEY);
            if (!data) {
                data = await getCarDetails();
                this.storage.set(CAR_DETAILS_KEY, data, 30 * 1000);
            }
            return data;
        } catch (e) {
            throw e
        }

    }
}