import type React from 'react';
import type { FC } from 'react';
import { Loader, Logo, Moves, Timer } from '../../components';

interface FinishScreenInterface {
    game: PartialGameState;
    loading: boolean;
    startAction: React.MouseEventHandler<HTMLButtonElement>;
    endAction: React.MouseEventHandler<HTMLButtonElement>;
}

/**
 * Screen with game results and buttons to start new game or end game
 */
const FinishScreen: FC<FinishScreenInterface> = ({ game, loading, startAction, endAction }) => {
    return (
        <>
            <Logo screen='finish' />
            <h2 data-testid='finish-congratulations'>{chrome.i18n.getMessage('congratulations_you_did_it')}</h2>
            <div className='text' data-testid='finish-start-page'>
                {chrome.i18n.getMessage('start_page')}: <strong>{game.startPageTitle}</strong>
            </div>
            <div className='text' data-testid='finish-target-page'>
                {chrome.i18n.getMessage('target_page')}: <strong>{game?.target?.title}</strong>
            </div>
            <div className='text' data-testid='finish-time'>
                {chrome.i18n.getMessage('time')}: {<Timer startTime={game.startedAt} endTime={game.endedAt} />}
            </div>
            {game.history && game.startPageTitle && (
                <Moves history={game.history} startPageTitle={game.startPageTitle} open={true} />
            )}
            <div className='buttons-block'>
                {loading ? (
                    <Loader />
                ) : (
                    <button type='button' onClick={startAction} data-testid='finish-start-new-game'>
                        {chrome.i18n.getMessage('start_new_game')}
                    </button>
                )}
                <button type='button' onClick={endAction} data-testid='finish-end-game'>
                    {chrome.i18n.getMessage('end_game')}
                </button>
            </div>
        </>
    );
};

export default FinishScreen;
