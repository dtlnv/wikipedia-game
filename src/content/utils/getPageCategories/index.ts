const CATEGORIES_SELECTOR = '#catlinks .mw-normal-catlinks ul a, #articleCategories ul.categories li.category a';

/**
 * Fetch a wiki page and scrape its categories from the bottom of the page.
 * Done on the content-script side because DOMParser is unavailable in the service worker.
 * @param url
 * @returns categories: string[]
 */
export default async function getPageCategories(url: string): Promise<string[]> {
    const htmlString = await (await fetch(url)).text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    const categories: string[] = [];

    doc.querySelectorAll(CATEGORIES_SELECTOR).forEach((element) => {
        categories.push(element.textContent);
    });

    return categories;
}
