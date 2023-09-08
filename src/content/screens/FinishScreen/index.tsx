import React from 'react';
import { Loader, Logo, Moves, Timer } from '../../components';
import { FinishScreenInterface } from './types';

/**
 * FinishScreen component renders finish screen with game results and buttons to start new game or end game
 */
const FinishScreen: React.FC<FinishScreenInterface> = ({ game, loading, startAction, endAction }) => {
    return (
        <>
            <Logo screen='finish' />
            <h2>You did it!</h2>
            <div className='text'>
                Start page: <strong>{game.startPageTitle}</strong>
            </div>
            <div className='text'>
                Target page: <strong>{game.target.title}</strong>
            </div>
            <div className='text'>Time: {<Timer startTime={game.startedAt} endTime={game.endedAt} />}</div>
            <Moves history={game.history} startPageTitle={game.startPageTitle} open={true} />
            <div className='buttons-block'>
                {loading ? <Loader /> : <button onClick={startAction}>Start new game</button>}
                <button onClick={endAction}>End game</button>
            </div>
        </>
    );
};

export default FinishScreen;
