import serviceWorkerRequest from '.';

describe('serviceWorkerRequest', () => {
    beforeAll(() => {
        global.chrome = {
            runtime: {
                sendMessage: jest.fn((message, callback) => {
                    callback(message);
                }),
            },
        } as any;
    });

    it('should return a promise', () => {
        expect(serviceWorkerRequest('', {})).toBeInstanceOf(Promise);
    });

    it('should call chrome.runtime.sendMessage', () => {
        const message = 'message';
        const params = { params: 'params' };
        serviceWorkerRequest(message, params);
        expect(globalThis.chrome.runtime.sendMessage).toHaveBeenCalledWith({ action: message, params }, expect.any(Function));
    });
});
