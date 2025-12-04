import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import StartScreen from '.';

// Sample test data
const testProps = {
    startAction: jest.fn(),
    loading: false,
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

    it('calls the startAction function when the "Start game" button is clicked', async () => {
        const { getByText } = render(<StartScreen {...testProps} />);

        await userEvent.click(getByText('Start game'));
        expect(testProps.startAction).toHaveBeenCalled();
    });
});
