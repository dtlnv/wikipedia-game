import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import GameScreen from '.';
import { GameInterface } from '../../../common-types';

// Sample test data
const testProps = {
    game: {
        startPageTitle: 'Start Page',
        target: { title: 'Target Page', url: 'https://en.wikipedia.org/wiki/JavaScript' },
        startedAt: Date.now() - 3600000, // 1 hour ago
        endedAt: Date.now(),
        history: ['Page 1', 'Page 2', 'Page 3'],
    } as GameInterface,
    loading: false,
    startAction: jest.fn(),
    endAction: jest.fn(),
    setGame: jest.fn(),
};

describe('GameScreen component', () => {
    beforeAll(() => {
        globalThis.chrome = {
            runtime: {
                getURL: (name: string) => name,
            },
        } as any;
    });

    it('renders the in-progress game screen with game status and buttons', () => {
        const { getByText, getByRole } = render(<GameScreen {...testProps} />);

        expect(getByText('Find this page by following the links in the content:')).toBeInTheDocument();
        expect(getByText('Target Page')).toBeInTheDocument();
        expect(getByText('Time:')).toBeInTheDocument();
        expect(getByRole('button', { name: 'Hint' })).toBeInTheDocument();
        expect(getByRole('button', { name: 'Reset game' })).toBeInTheDocument();
        expect(getByRole('button', { name: 'End game' })).toBeInTheDocument();
    });

    it.skip('calls the hintAction function when the "Hint" button is clicked', async () => {
        // Mock the fetch function for hintAction
        // globalThis.fetch = jest.fn(() => ({
        //     text: () => Promise.resolve('<html><body><div id="catlinks"><ul><li><a>Category 1</a></li></ul></div></body></html>'),
        // }));
        const { getByRole } = render(<GameScreen {...testProps} />);

        fireEvent.click(getByRole('button', { name: 'Hint' }));
        expect(testProps.setGame).toHaveBeenCalledWith({
            ...testProps.game,
            hint: 'Category 1',
        });
    });

    it('renders the "👀" icon next to the "Hint" button when a hint is available', () => {
        testProps.game.hint = 'Category 1';
        const { getByText } = render(<GameScreen {...testProps} />);

        expect(getByText('Hint 👀')).toBeInTheDocument();
    });

    it('renders a loader when loading is true', () => {
        const { container } = render(<GameScreen {...testProps} loading={true} />);

        expect(container.querySelector('.loader')).toBeInTheDocument();
    });
});
