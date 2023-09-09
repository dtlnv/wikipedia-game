import React from 'react';
import '@testing-library/jest-dom';
import { render, act } from '@testing-library/react';
import Timer from '.';

// Mock the setInterval and clearInterval functions to control time in tests
jest.useFakeTimers();

// Sample test data
const testProps = {
    startTime: Date.now(),
};

describe('Timer component', () => {
    it('renders the initial time correctly', () => {
        const { getByText } = render(<Timer {...testProps} />);
        const initialTime = getByText('00:00:00');

        expect(initialTime).toBeInTheDocument();
    });

    it('updates the time when the interval elapses', () => {
        const { getByText } = render(<Timer {...testProps} />);
        const timerElement = getByText('00:00:00');

        // Advance time by 1 second
        act(() => {
            jest.advanceTimersByTime(1000);
        });

        expect(timerElement.textContent).not.toBe('00:00:00');
        jest.useRealTimers();
    });

    it('renders the correct time after a specified endTime', () => {
        const endTime = testProps.startTime + 3600000; // 1 hour later
        const { getByText } = render(<Timer startTime={testProps.startTime} endTime={endTime} />);
        const timerElement = getByText('01:00:00');

        expect(timerElement).toBeInTheDocument();
    });
});
