import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Search } from '.';

describe('Search component', () => {
    const mockSelectArticleAction = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    beforeAll(() => {
        global.fetch = jest.fn();
    });

    it('renders the search button initially', () => {
        render(<Search selectArticleAction={mockSelectArticleAction} />);
        expect(screen.getByTestId('show-search-button')).toBeInTheDocument();
    });

    it('toggles search block visibility when button is clicked', () => {
        render(<Search selectArticleAction={mockSelectArticleAction} />);
        const button = screen.getByTestId('show-search-button');

        fireEvent.click(button);
        expect(screen.getByTestId('search-input')).toBeInTheDocument();

        fireEvent.click(button);
        expect(screen.queryByTestId('search-input')).not.toBeInTheDocument();
    });

    it('displays search results after debounce when query length is >= 2', async () => {
        const mockResults = {
            query: {
                search: [
                    { title: 'Test Article', snippet: 'Test snippet', pageid: 1 },
                    { title: 'Another Test', snippet: 'Another snippet', pageid: 2 },
                ],
            },
        };

        global.fetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve(mockResults) } as Response));

        render(<Search selectArticleAction={mockSelectArticleAction} />);
        fireEvent.click(screen.getByTestId('show-search-button'));

        const input = screen.getByTestId('search-input');
        await userEvent.type(input, 'test');

        await waitFor(() => {
            expect(screen.getByText('Test Article')).toBeInTheDocument();
            expect(screen.getByText('Another Test')).toBeInTheDocument();
        });
    });

    it('does not search when query length is less than 2', async () => {
        global.fetch = jest.fn() as jest.Mock;

        render(<Search selectArticleAction={mockSelectArticleAction} />);
        fireEvent.click(screen.getByTestId('show-search-button'));

        const input = screen.getByTestId('search-input');
        await userEvent.type(input, 'a');

        await new Promise((resolve) => setTimeout(resolve, 300));

        expect(global.fetch).not.toHaveBeenCalled();
    });
});
