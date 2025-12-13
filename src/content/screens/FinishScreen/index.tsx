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
            <h2>You did it!</h2>
            <div className='text'>
                Start page: <strong>{game.startPageTitle}</strong>
            </div>
            <div className='text'>
                Target page: <strong>{game?.target?.title}</strong>
            </div>
            <div className='text'>Time: {<Timer startTime={game.startedAt} endTime={game.endedAt} />}</div>
            {game.history && game.startPageTitle && (
                <Moves history={game.history} startPageTitle={game.startPageTitle} open={true} />
            )}
            <div className='buttons-block'>
                {loading ? (
                    <Loader />
                ) : (
                    <button type='button' onClick={startAction}>
                        Start new game
                    </button>
                )}
                <button type='button' onClick={endAction}>
                    End game
                </button>
            </div>
        </>
    );
};

export default FinishScreen;
