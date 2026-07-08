import getPageCategories from '.';

describe('getPageCategories', () => {
    const mockFetch = (html: string) => {
        global.fetch = jest.fn().mockResolvedValue({ text: () => Promise.resolve(html) }) as jest.Mock;
    };

    it('should return categories scraped from the page bottom links', async () => {
        mockFetch(`
            <html>
                <body>
                    <div id='catlinks'>
                        <div class='mw-normal-catlinks'>
                            <ul>
                                <li><a href='/wiki/Category:One'>Category One</a></li>
                                <li><a href='/wiki/Category:Two'>Category Two</a></li>
                            </ul>
                        </div>
                    </div>
                </body>
            </html>
        `);

        const categories = await getPageCategories('https://en.wikipedia.org/wiki/Example');

        expect(categories).toEqual(['Category One', 'Category Two']);
    });

    it('should return an empty array when there are no categories', async () => {
        mockFetch('<html><body></body></html>');

        const categories = await getPageCategories('https://en.wikipedia.org/wiki/Example');

        expect(categories).toEqual([]);
    });
});
