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

        expect(getByText('Moves:')).toBeInTheDocument();
        expect(container.querySelector('.moves-list')).not.toBeInTheDocument();
    });

    it('shows the start page title', () => {
        const { container, getByText } = render(<Moves {...testProps} open={true} />);

        expect(getByText('Moves:')).toBeInTheDocument();
        expect(getByText(testProps.startPageTitle)).toBeInTheDocument();
        expect(container.querySelector('.moves-list')).toBeInTheDocument();
    });

    it('toggles the history list when the "Moves" link is clicked', () => {
        const { container, getByText } = render(<Moves {...testProps} />);

        fireEvent.click(getByText('Moves:'));
        expect(container.querySelector('.moves-list')).toBeInTheDocument();

        fireEvent.click(getByText('Moves:'));
        expect(container.querySelector('.moves-list')).not.toBeInTheDocument();
    });

    it('renders the correct number of history items', () => {
        const { container, getByText } = render(<Moves {...testProps} />);

        fireEvent.click(getByText('Moves:'));
        expect(container.querySelectorAll('.moves-list li')).toHaveLength(4); // 3 history items + start page
    });
});
