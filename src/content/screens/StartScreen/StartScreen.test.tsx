import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import StartScreen from '.';

// Sample test data
const testProps = {
    startAction: jest.fn(),
    selectArticleAction: jest.fn(),
    loading: false,
};

describe('StartScreen component', () => {
    beforeAll(() => {
        globalThis.chrome = {
            runtime: {
                getURL: (name: string) => name,
            },
            i18n: {
                getMessage: jest.fn(),
            },
        } as any;
    });

    it('renders the start screen with a "Start game" button', () => {
        const { getByTestId } = render(<StartScreen {...testProps} />);

        expect(getByTestId('start-game-button')).toBeInTheDocument();
    });

    it('calls the startAction function when the "Start game" button is clicked', async () => {
        const { getByTestId } = render(<StartScreen {...testProps} />);

        await userEvent.click(getByTestId('start-game-button'));
        expect(testProps.startAction).toHaveBeenCalled();
    });
});
