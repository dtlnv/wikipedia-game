// background helpers

export async function getRandomPage(sender: chrome.runtime.MessageSender): Promise<object> {
    const randomURL = sender.origin + '/wiki/Special:Random'; // https://en.wikipedia.org/wiki/Special:Random

    const res = await fetch(randomURL);
    const url = decodeURIComponent(res.url);
    const title = getPageTitle(url);

    return { url, title };
}

export function getPageTitle(url: string) {
    function getLastPartOfUrl(url: string) {
        const regex = /\/wiki\/(.*)$/;
        const match = url.match(regex);
        return match ? match[1] : '';
    }

    return decodeURIComponent(getLastPartOfUrl(url)).replace(/_/g, ' ');
}
