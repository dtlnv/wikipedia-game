import React from 'react';
import GameInterface from '../../utils/GameInterface';
import { Moves, Timer } from './';

interface FinishScreenInterface {
    game: GameInterface;
    startAction: React.MouseEventHandler<HTMLButtonElement>;
    endAction: React.MouseEventHandler<HTMLButtonElement>;
}

const FinishScreen: React.FC<FinishScreenInterface> = ({ game, startAction, endAction }) => {
    return (
        <div className='container'>
            <h2>You did it!</h2>
            <div className='text'>
                Start page: <strong>{game.startPageTitle}</strong>
            </div>
            <div className='text'>
                Target page: <strong>{game.target.title}</strong>
            </div>
            <div className='text'>Time: {<Timer startTime={game.startedAt} endTime={game.endedAt} />}</div>
            <Moves history={game.history} startPageTitle={game.startPageTitle} />
            <div className='buttons-block'>
                <button onClick={startAction}>Start new game</button>
                <button onClick={endAction}>End game</button>
            </div>
        </div>
    );
};

export default FinishScreen;
