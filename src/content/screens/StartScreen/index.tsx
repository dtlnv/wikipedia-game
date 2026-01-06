import type { FC } from 'react';
import { Loader, Logo, Search } from '../../components';

interface StartScreenInterface {
    startAction: React.MouseEventHandler<HTMLButtonElement>;
    selectArticleAction: (article: string) => Promise<void>;
    loading: boolean;
}

/**
 * Screen with button to start game
 */
const StartScreen: FC<StartScreenInterface> = ({ startAction, loading, selectArticleAction }) => {
    return (
        <>
            <Logo screen='start' />
            {loading ? (
                <Loader />
            ) : (
                <div className='buttons-block'>
                    <button type='button' onClick={startAction} data-testid='start-game-button'>
                        {chrome.i18n.getMessage('start_game')}
                    </button>
                    <Search selectArticleAction={selectArticleAction} />
                </div>
            )}
        </>
    );
};

export default StartScreen;
