import swRequest from './sw-request';

(async () => {
    const r = await swRequest('getFinishPage');
    console.log('r', r);
})();
