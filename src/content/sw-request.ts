interface SwRequestInterface {
    (action: string, params?: object): Promise<object>;
}

const swRequest: SwRequestInterface = (action, params): Promise<object> => {
    return new Promise((resolve, reject) => {
        try {
            chrome.runtime.sendMessage({ action, params }, (response) => {
                console.log('response', response);

                resolve(response);
            });
        } catch (e) {
            reject(e);
        }
    });
};

export default swRequest;
