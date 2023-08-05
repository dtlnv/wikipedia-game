import React, { useEffect, useState } from 'react';
import swRequest from './sw-request';
import { derestrictions, restrictions } from './helpers';
import Timer from './timer';

interface GameInterface {
    target?: { [key: string]: string };
    state?: string;
    moves?: number;
    startedAt?: number;
    endedAt?: number;
    hint?: string;
    startPageTitle?: string;
}

function App() {
    const [loading, setLoading] = useState<boolean>(true);
    const [game, setGame] = useState<GameInterface>({});

    // Receive game status.
    useEffect(() => {
        const getGameStatus = async () => {
            try {
                const game: GameInterface = await swRequest('gameStatus');
                console.log('getGameStatus: game', game);
                if (game) {
                    setGame(game);
                    restrictions();
                    if (game.state === 'finish') {
                        derestrictions();
                        // for direct link
                        if (game.moves === 0) {
                            endAction();
                        }
                    }
                }
            } catch (err) {
                setGame(null);
                console.log('Error', err);
            } finally {
                setLoading(false);
            }
        };

        setTimeout(getGameStatus, 100); // Timeout is required for redirects
    }, []);

    // click on links handler
    useEffect(() => {
        const contentLinkClick = (e: MouseEvent): void => {
            const element = e.target as HTMLAnchorElement;
            if (element && element.closest('#content') && element.tagName === 'A' && 'href' in element) {
                const link: string | undefined = element.href;
                if (link && link.startsWith(window.location.origin)) {
                    swRequest('addHistory', { link });
                }
            }
        };

        document.addEventListener('click', contentLinkClick);

        return () => {
            document.removeEventListener('click', contentLinkClick);
        };
    }, []);

    const startAction = async () => {
        setLoading(true);
        const game: GameInterface = await swRequest('gameStart');
        setGame(game);
        restrictions();
        setLoading(false);
    };

    const endAction = async () => {
        setGame({});
        derestrictions();
        swRequest('endGame');
    };

    const hintAction = async () => {
        const htmlString = await (await fetch(game.target.url)).text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, 'text/html');
        const categories: string[] = [];
        doc.querySelectorAll('#catlinks .mw-normal-catlinks ul a').forEach((element) => {
            categories.push(element.textContent);
        });

        const hint = categories.join('; ');

        setGame((prev) => ({ ...prev, hint }));
        swRequest('addHint', { hint });
    };

    if (loading && !game.state) return '...';

    if (!game.state) {
        return (
            <div className='container'>
                <button onClick={startAction}>Start game</button>
            </div>
        );
    }

    if (game.state === 'finish') {
        return (
            <div className='container'>
                <h2>Congratulations!</h2>
                <div className='text'>
                    Start page: <strong>{game.startPageTitle}</strong>
                </div>
                <div className='text'>
                    Target page: <strong>{game.target.title}</strong>
                </div>
                <div className='text'>
                    Moves: <strong>{game.moves}</strong>
                </div>
                <div className='text'>Time: {<Timer startTime={game.startedAt} endTime={game.endedAt} />}</div>
                <div className='buttons-block'>
                    <button onClick={startAction}>Start new game</button>
                    <button onClick={endAction} disabled={loading}>
                        End game
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className='container'>
            <div className='text'>Find this page by following the links in the content:</div>
            <div className='text target-title' title={game.target.url}>
                {loading ? '...' : game.target.title}
            </div>
            <div className='text'>
                Moves: <strong>{loading ? 0 : game.moves}</strong>
            </div>
            <div className='text'>Time: {!loading && <Timer startTime={game.startedAt} />}</div>
            <div className='buttons-block'>
                <button
                    className='hint-button'
                    onClick={hintAction}
                    disabled={loading || !!game.hint}
                    title={!loading && game.hint}
                >
                    Hint {!loading && game.hint && '👀'}
                </button>
                <button onClick={startAction} disabled={loading}>
                    Reset game
                </button>
                <button onClick={endAction} disabled={loading}>
                    End game
                </button>
            </div>
        </div>
    );
}

export default App;
