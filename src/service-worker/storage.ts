const KEY = '_wg_storage_';

const save = (data: any): Promise<void> => {
    return new Promise((resolve) => {
        chrome.storage.local.set({ [KEY]: data }, () => {
            resolve();
        });
    });
};

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
