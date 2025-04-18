/**
 * Send requests to the service worker.
 */
const serviceWorkerRequest: ServiceWorkerRequestInterface = (action, params): Promise<any> => {
    return new Promise((resolve, reject) => {
        try {
            chrome.runtime.sendMessage({ action, params }, (response) => {
                resolve(response);
            });
        } catch (e) {
            reject(e);
        }
    });
};

export default serviceWorkerRequest;
