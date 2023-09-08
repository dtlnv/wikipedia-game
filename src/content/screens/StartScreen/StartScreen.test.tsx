import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import StartScreen from '.';

// Sample test data
const testProps = {
    startAction: jest.fn(),
};

describe('StartScreen component', () => {
    beforeAll(() => {
        globalThis.chrome = {
            runtime: {
                getURL: (name: string) => name,
            },
        } as any;
    });

    it('renders the start screen with a "Start game" button', () => {
        const { getByText } = render(<StartScreen {...testProps} />);

        expect(getByText('Start game')).toBeInTheDocument();
    });

    it('calls the startAction function when the "Start game" button is clicked', () => {
        const { getByText } = render(<StartScreen {...testProps} />);

        // Click the "Start game" button
        fireEvent.click(getByText('Start game'));

        // Check if the startAction function was called
        expect(testProps.startAction).toHaveBeenCalled();
    });
});
