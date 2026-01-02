import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FinishScreen from '.';

// Sample test data
const testProps = {
    game: {
        startPageTitle: 'Start Page',
        target: { title: 'Target Page' },
        startedAt: Date.now() - 3600000, // 1 hour ago
        endedAt: Date.now(),
        history: ['Page 1', 'Page 2', 'Page 3'],
    } as PartialGameState,
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
            i18n: {
                getMessage: jest.fn(),
            },
        } as any;
    });

    it('renders the finish screen with game results', () => {
        const { getByTestId } = render(<FinishScreen {...testProps} />);

        expect(getByTestId('finish-congratulations')).toBeInTheDocument();
        expect(getByTestId('finish-start-page')).toBeInTheDocument();
        expect(getByTestId('finish-target-page')).toBeInTheDocument();
        expect(getByTestId('finish-time')).toBeInTheDocument();
        expect(getByTestId('finish-start-new-game')).toBeInTheDocument();
        expect(getByTestId('finish-end-game')).toBeInTheDocument();
    });

    it('calls the startAction and endAction functions when buttons are clicked', async () => {
        const { getByTestId } = render(<FinishScreen {...testProps} />);

        await userEvent.click(getByTestId('finish-start-new-game'));
        expect(testProps.startAction).toHaveBeenCalled();

        await userEvent.click(getByTestId('finish-end-game'));
        expect(testProps.endAction).toHaveBeenCalled();
    });

    it('renders a loader when loading is true', () => {
        const { container } = render(<FinishScreen {...testProps} loading={true} />);

        expect(container.querySelector('.loader')).toBeInTheDocument();
    });
});
