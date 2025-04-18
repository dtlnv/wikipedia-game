/**
 * Get the URL and title of a random page to use as the target.
 * @param sender
 * @returns { url: string, title: string }
 */
export async function getRandomPage(sender: chrome.runtime.MessageSender): Promise<object> {
    try {
        const randomURL = sender.origin + '/wiki/Special:Random'; // https://en.wikipedia.org/wiki/Special:Random
        const res = await fetch(randomURL);
        const url = decodeURIComponent(res.url);
        const title = getPageTitle(url);

        return { url, title };
    } catch {
        return null;
    }
}

/**
 * Get page title from URL.
 * @param url
 * @returns title: string
 */
export function getPageTitle(url: string): string {
    function getLastPartOfUrl(url: string) {
        const regex = /\/wiki\/(.*)$/;
        const match = url.match(regex);
        return match ? match[1] : '';
    }

    return decodeURIComponent(getLastPartOfUrl(url)).replace(/_/g, ' ').replace(/:/g, ': ');
}
