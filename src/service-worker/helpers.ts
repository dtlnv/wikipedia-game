/**
 * Get the URL and title of a random page to use as the target.
 * @param sender
 * @returns { url: string, title: string }
 */
export async function getRandomPage(sender: chrome.runtime.MessageSender): Promise<{ url: string; title: string } | null> {
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
 * Get the URL and title of a selected page to use as the target.
 * @param title
 * @param sender
 * @returns { url: string, title: string }
 */
export async function getSelectedPage(
    title: string,
    sender: chrome.runtime.MessageSender
): Promise<{ url: string; title: string } | null> {
    try {
        const pageURL = sender.origin + '/wiki/' + encodeURIComponent(title.replace(/ /g, '_'));
        const res = await fetch(pageURL);
        if (!res.ok) {
            return null;
        }

        const url = decodeURIComponent(res.url);
        const pageTitle = getPageTitle(url);

        return { url, title: pageTitle };
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
