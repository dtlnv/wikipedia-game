import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import FinishScreen from '.';

// Sample test data
const testProps = {
    game: {
        startPageTitle: 'Start Page',
        target: { title: 'Target Page' },
        startedAt: Date.now() - 3600000, // 1 hour ago
        endedAt: Date.now(),
        history: ['Page 1', 'Page 2', 'Page 3'],
    },
    loading: false,
    startAction: jest.fn(),
    endAction: jest.fn(),
};

describe('FinishScreen component', () => {
    beforeAll(() => {
        globalThis.chrome = {
            runtime: {
                getURL: (name: string) => name,
            },
        } as any;
    });

    it('renders the finish screen with game results', () => {
        const { getByText, getByRole } = render(<FinishScreen {...testProps} />);

        expect(getByText('You did it!')).toBeInTheDocument();
        expect(getByText('Start page:')).toBeInTheDocument();
        expect(getByText('Target page:')).toBeInTheDocument();
        expect(getByText('Time:')).toBeInTheDocument();
        expect(getByRole('button', { name: 'Start new game' })).toBeInTheDocument();
        expect(getByRole('button', { name: 'End game' })).toBeInTheDocument();
    });

    it('calls the startAction and endAction functions when buttons are clicked', () => {
        const { getByRole } = render(<FinishScreen {...testProps} />);

        // Click the "Start new game" button
        fireEvent.click(getByRole('button', { name: 'Start new game' }));

        // Check if the startAction function was called
        expect(testProps.startAction).toHaveBeenCalled();

        // Click the "End game" button
        fireEvent.click(getByRole('button', { name: 'End game' }));

        // Check if the endAction function was called
        expect(testProps.endAction).toHaveBeenCalled();
    });

    it('renders a loader when loading is true', () => {
        const { container } = render(<FinishScreen {...testProps} loading={true} />);

        expect(container.querySelector('.loader')).toBeInTheDocument();
    });
});
