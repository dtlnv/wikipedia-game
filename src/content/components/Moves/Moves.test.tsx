import '@testing-library/jest-dom';
import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Moves } from '.';
import * as utils from '../../utils';

// Mock the serviceWorkerRequest
jest.mock('../../utils', () => ({
    serviceWorkerRequest: jest.fn(),
}));

// Sample test data
const testProps = {
    history: ['Page 1', 'Page 2', 'Page 3'],
    startPageTitle: 'Start Page',
    open: false,
};

describe('Moves component', () => {
    beforeAll(() => {
        globalThis.chrome = {
            i18n: {
                getMessage: jest.fn(),
            },
        } as any;
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders the initial closed state', () => {
        const { container } = render(<Moves {...testProps} />);

        expect(container.querySelector('[data-testid="moves-link"]')).toBeInTheDocument();
        expect(container.querySelector('[data-testid="moves-link"]')).toHaveTextContent('3');
        expect(container.querySelector('.moves-list')).not.toBeInTheDocument();
    });

    it('shows the start page title when open', () => {
        const { container } = render(<Moves {...testProps} open={true} />);

        expect(container.querySelector('[data-testid="moves-link"]')).toBeInTheDocument();
        expect(container.querySelector('.moves-list')).toBeInTheDocument();
    });

    it('toggles the history list when the "Moves" link is clicked', async () => {
        const { container } = render(<Moves {...testProps} />);

        await userEvent.click(container.querySelector('[data-testid="moves-link"]')!);
        await waitFor(() => {
            expect(container.querySelector('.moves-list')).toBeInTheDocument();
        });
        expect(utils.serviceWorkerRequest).toHaveBeenCalledWith('showHistory', { opened: true });

        await userEvent.click(container.querySelector('[data-testid="moves-link"]')!);
        await waitFor(() => {
            expect(container.querySelector('.moves-list')).not.toBeInTheDocument();
        });
        expect(utils.serviceWorkerRequest).toHaveBeenCalledWith('showHistory', { opened: false });
    });

    it('renders the correct number of history items', async () => {
        const { container } = render(<Moves {...testProps} />);

        await userEvent.click(container.querySelector('[data-testid="moves-link"]')!);
        await waitFor(() => {
            expect(container.querySelectorAll('.moves-list li')).toHaveLength(4);
        });
    });
});
