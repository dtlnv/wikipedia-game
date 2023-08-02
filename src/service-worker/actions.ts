// https://ru.wikipedia.org/wiki/Special:Random

interface ActionInterface {
    params?: object;
    sender?: chrome.runtime.MessageSender;
}

async function getFinishPage({ sender }: ActionInterface): Promise<object> {
    const randomURL = sender.origin + '/wiki/Special:Random';
    console.log('randomURL', randomURL);

    const res = await fetch(randomURL);
    console.log('res', res);

    const url = decodeURIComponent(res.url);
    const title = url.split('/').pop().replace(/_/g, ' ');

    return {
        url,
        title,
    };
}

export default {
    getFinishPage,
};
