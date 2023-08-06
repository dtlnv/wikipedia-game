import actions from './actions';

/**
 * Receive and process requests from content scripts.
 */
interface ContentListenerInterface {
    (message: any, sender: chrome.runtime.MessageSender, sendResponse: Function): Promise<void>;
}

const contentListener: ContentListenerInterface = async (request, sender, sendResponse): Promise<void> => {
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
