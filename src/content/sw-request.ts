interface SwRequestInterface {
    (action: string, params?: object): Promise<any>;
}

const swRequest: SwRequestInterface = (action, params): Promise<any> => {
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

export default swRequest;
