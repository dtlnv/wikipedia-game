import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent } from '@testing-library/react';
import Moves from '.';

// Sample test data
const testProps = {
    history: ['Page 1', 'Page 2', 'Page 3'],
    startPageTitle: 'Start Page',
    open: false,
};

describe('Moves component', () => {
    it('renders the initial closed state', () => {
        const { container, getByText } = render(<Moves {...testProps} />);

        // Assert that the Moves component is rendered with the correct text
        expect(getByText('Moves:')).toBeInTheDocument();

        // Assert that the history list is not initially visible
        expect(container.querySelector('.moves-list')).not.toBeInTheDocument();
    });

    it('shows the start page title', () => {
        const { container, getByText } = render(<Moves {...testProps} open={true} />);

        // Assert that the Moves component is rendered with the correct text
        expect(getByText('Moves:')).toBeInTheDocument();
        expect(getByText(testProps.startPageTitle)).toBeInTheDocument();

        // Assert that the history list  visible
        expect(container.querySelector('.moves-list')).toBeInTheDocument();
    });

    it('toggles the history list when the "Moves" link is clicked', () => {
        const { container, getByText } = render(<Moves {...testProps} />);

        // Click the "Moves" link
        fireEvent.click(getByText('Moves:'));

        // Assert that the history list becomes visible
        expect(container.querySelector('.moves-list')).toBeInTheDocument();

        // Click the "Moves" link again
        fireEvent.click(getByText('Moves:'));

        // Assert that the history list is hidden again
        expect(container.querySelector('.moves-list')).not.toBeInTheDocument();
    });

    it('renders the correct number of history items', () => {
        const { container, getByText } = render(<Moves {...testProps} />);

        // Click the "Moves" link to show the history list
        fireEvent.click(getByText('Moves:'));

        // Assert that the correct number of history items is rendered
        expect(container.querySelectorAll('.moves-list li')).toHaveLength(4); // 3 history items + start page
    });
});
