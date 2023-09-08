import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Loader from '.';

describe('Loader component', () => {
    it('renders without errors', () => {
        const { container } = render(<Loader />);

        const loaderElement = container.querySelector('.loader');

        expect(loaderElement).toBeInTheDocument();
    });
});
