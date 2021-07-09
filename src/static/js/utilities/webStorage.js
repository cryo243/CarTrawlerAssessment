/**
 * This  implements a singleton abstraction of the web storage layer
 * In this specific case we are making use of the localstorage but this can be swapped out with any other storage
 * medium indexdb, sessionStorage or web sql
 * without affecting the rest of the code
 */

let instance;
export class WebStorage {
    constructor() {
        if (!instance) {
            instance = this;
        }
        return instance;
    }
    /**
     * Stores an object in the DB
     * @function
     * @param {string} key - The item DB key.
     * @param {object} value - The value.
     * @param {number} timeToLive - Marks the time in ms the item should stay alive in the DB.
     */
     set(key, value, timeToLive) {
        try {
            localStorage.setItem(key, JSON.stringify({
                data: value,
                metadata: {
                    updatedAt: (timeToLive) ? new Date() : null,
                    ttl: timeToLive
                }
            }));

        } catch (e) {
            console.log(e.toString());
        }

    }

    /**
     * Get a stored item.
     * @function
     * @param {string} key - The key of the value to retrieve.
     * @return the value initially stored in the local storage
     */
    get(key) {
        try {
            const storedData = localStorage.getItem(key);
            if (storedData) {
                const value = JSON.parse(storedData);
                if (value.metadata.ttl && ((Date.now() - new Date(value.metadata.updatedAt).getTime()) >= value.metadata.ttl)) {
                    return null;
                } else {
                    return value.data;
                }
            } else return null;
        } catch (e) {
            return null
        }
    }

}

