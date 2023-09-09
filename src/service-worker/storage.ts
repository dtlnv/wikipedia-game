const KEY = '_wg_storage_';

/**
 * Save data in the chrome storage.
 * @param data
 */
const save = (data: any): Promise<void> => {
    return new Promise((resolve) => {
        chrome.storage.local.set({ [KEY]: data }, () => {
            resolve();
        });
    });
};

/**
 * Get data from the chrome storage.
 * @returns Promise with the data from the chrome storage
 */
const get = (): Promise<any> => {
    return new Promise((resolve) => {
        chrome.storage.local.get([KEY], (result) => {
            resolve(result[KEY]);
        });
    });
};

export default {
    save,
    get,
};
