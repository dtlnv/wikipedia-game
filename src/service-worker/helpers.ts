// background helpers

export async function randomPage(sender: chrome.runtime.MessageSender): Promise<object> {
    const randomURL = sender.origin + '/wiki/Special:Random';

    const res = await fetch(randomURL);
    const url = decodeURIComponent(res.url);
    const title = getPageTitle(url);
    // todo: ё

    return { url, title };
}

export function serializer(game: { [key: string]: any }) {
    const object = { ...game };
    object.moves = object.history.length;
    delete object.history;
    return object;
}

export function getPageTitle(url: string) {
    function getLastPartOfUrl(url: string) {
        const regex = /\/wiki\/(.*)$/;
        const match = url.match(regex);
        return match ? match[1] : '';
    }

    return decodeURIComponent(getLastPartOfUrl(url)).replace(/_/g, ' ');
}
