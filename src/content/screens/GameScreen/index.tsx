import React, { useEffect, useState } from 'react';
import { Loader, Logo, Moves, Timer } from '../../components';
import { GameScreenInterface } from './types';
import { serviceWorkerRequest } from '../../utils';

/**
 * GameScreen component renders in progress game screen with game status and buttons to get hint, start new game or end game
 */
const GameScreen: React.FC<GameScreenInterface> = ({ game, loading, startAction, endAction, setGame }) => {
    const [showHintForHint, setShowHintForHint] = useState<boolean>(false);

    useEffect(() => {
        setShowHintForHint(false);
    }, [loading]);

    const hintAction = async () => {
        const htmlString = await (await fetch(game.target.url)).text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, 'text/html');
        const categories: string[] = [];
        doc.querySelectorAll('#catlinks .mw-normal-catlinks ul a').forEach((element) => {
            categories.push(element.textContent);
        });

        const hint = categories.join('; ');

        setGame({ ...game, hint });
        serviceWorkerRequest('addHint', { hint });
        setShowHintForHint(true);
    };

    return (
        <>
            <Logo screen='game' />
            <div className='text center'>Find this page by following the links in the content:</div>
            <div className='text center target-title' title={game.target.url}>
                {loading ? '...' : game.target.title}
            </div>
            <div className='text'>Time: {!loading && <Timer startTime={game.startedAt} />}</div>
            <Moves history={game.history} startPageTitle={game.startPageTitle} />
            <div className='buttons-block'>
                <button
                    className='hint-button'
                    onClick={hintAction}
                    disabled={loading || !!game.hint}
                    title={!loading ? game.hint : ''}
                >
                    Hint {!loading && game.hint && '👀'}
                </button>
                {showHintForHint && <div className='center'>^^ Hover the button ^^</div>}
                {loading ? <Loader /> : <button onClick={startAction}>Reset game</button>}
                <button onClick={endAction} disabled={loading}>
                    End game
                </button>
            </div>
        </>
    );
};

export default GameScreen;
