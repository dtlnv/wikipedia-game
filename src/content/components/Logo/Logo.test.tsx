import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Logo from '.';

describe('Logo component', () => {
    beforeAll(() => {
        // Mock chrome.runtime.getURL() to return the same URL as the src attribute of the <img> element
        globalThis.chrome = {
            runtime: {
                getURL: (name: string) => name,
            },
        } as any;
    });

    it('renders the default logo for "start" screen', () => {
        const { container } = render(<Logo screen='start' />);
        const imgElement = container.querySelector('img');

        expect(imgElement).toBeInTheDocument();
        expect(imgElement?.getAttribute('src')).toBe('images/logo.png');
        expect(imgElement?.getAttribute('title')).toBe('Wikipedia Game');
    });

    it('renders the "in-progress" logo for "game" screen', () => {
        const { container } = render(<Logo screen='game' />);
        const imgElement = container.querySelector('img');

        expect(imgElement).toBeInTheDocument();
        expect(imgElement?.getAttribute('src')).toBe('images/logo-inprogress.png');
        expect(imgElement?.getAttribute('title')).toBe('Wikipedia Game');
    });

    it('renders the "finish" logo for "finish" screen', () => {
        const { container } = render(<Logo screen='finish' />);
        const imgElement = container.querySelector('img');

        expect(imgElement).toBeInTheDocument();
        expect(imgElement?.getAttribute('src')).toBe('images/logo-finish.png');
        expect(imgElement?.getAttribute('title')).toBe('Wikipedia Game');
    });
});
