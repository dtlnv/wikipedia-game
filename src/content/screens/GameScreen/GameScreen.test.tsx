import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GameScreen from '.';

// Sample test data
const testProps = {
    game: {
        startPageTitle: 'Start Page',
        target: { title: 'Target Page', url: 'https://en.wikipedia.org/wiki/JavaScript' },
        startedAt: Date.now() - 3600000, // 1 hour ago
        endedAt: Date.now(),
        history: ['Page 1', 'Page 2', 'Page 3'],
    } as any,
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
            i18n: {
                getMessage: jest.fn(),
            },
        } as any;
    });

    it('renders the in-progress game screen with game status and buttons', () => {
        const { getByTestId } = render(<GameScreen {...testProps} />);

        expect(getByTestId('instruction-text')).toBeInTheDocument();
        expect(getByTestId('target-title')).toBeInTheDocument();
        expect(getByTestId('timer-text')).toBeInTheDocument();
        expect(getByTestId('hint-button')).toBeInTheDocument();
        expect(getByTestId('reset-game-button')).toBeInTheDocument();
        expect(getByTestId('end-game-button')).toBeInTheDocument();
    });

    it('renders the "👀" icon next to the "Hint" button when a hint is available', () => {
        testProps.game.hint = 'Category 1';
        const { getByTestId } = render(<GameScreen {...testProps} />);

        expect(getByTestId('hint-button')).toHaveTextContent('👀');
    });

    it('renders a loader when loading is true', () => {
        const { queryByRole } = render(<GameScreen {...testProps} loading={true} />);

        expect(queryByRole('progressbar')).toBeInTheDocument();
    });

    it('calls startAction when the "Reset game" button is clicked', async () => {
        const { getByTestId } = render(<GameScreen {...testProps} />);

        await userEvent.click(getByTestId('reset-game-button'));
        expect(testProps.startAction).toHaveBeenCalled();
    });

    it('calls endAction when the "End game" button is clicked', async () => {
        const { getByTestId } = render(<GameScreen {...testProps} />);

        await userEvent.click(getByTestId('end-game-button'));
        expect(testProps.endAction).toHaveBeenCalled();
    });

    it('disables the "Hint" button when loading is true', () => {
        const { getByTestId } = render(<GameScreen {...testProps} loading={true} />);

        expect(getByTestId('hint-button')).toBeDisabled();
    });
});
