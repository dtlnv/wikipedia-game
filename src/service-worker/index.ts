import actions from './actions';

interface ContentListenerInterface {
    (message: any, sender: chrome.runtime.MessageSender, sendResponse: Function): void;
}

const contentListener: ContentListenerInterface = async (request, sender, sendResponse) => {
    const method: keyof typeof actions = request.action;
    const params: object | undefined = request.params;
    if (method) {
        const response = await actions[method]({ params, sender });
        sendResponse(response);
    }
};

chrome.runtime.onMessage.addListener((...params) => {
    contentListener(...params);
    return true; // required for async requests
});
