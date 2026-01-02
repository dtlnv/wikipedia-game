import actions from './actions';

type ContentListenerInterface = (
    message: any,
    sender: chrome.runtime.MessageSender,
    sendResponse: (response: any) => void
) => Promise<void>;

/**
 * Receive and process requests from content scripts.
 */
const contentListener: ContentListenerInterface = async (request, sender, sendResponse): Promise<void> => {
    const method: keyof typeof actions = request.action;
    const params: object | undefined = request.params;
    if (method) {
        const response: any = await actions[method]({ params, sender });
        sendResponse(response);
    }
};

/**
 * Listen for messages from content scripts.
 */
chrome.runtime.onMessage.addListener((...params) => {
    contentListener(...params);
    return true; // required for async requests
});
