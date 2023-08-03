import React, { useEffect, useState } from 'react';
import swRequest from './sw-request';

interface GameInterface {
    target?: { [key: string]: string };
    state?: string;
    moves?: number;
    startedAt?: number;
}

function App() {
    const [loading, setLoading] = useState<boolean>(true);
    const [game, setGame] = useState<GameInterface>({});

    // Receive game status.
    useEffect(() => {
        const getGameStatus = async () => {
            try {
                const game = await swRequest('gameStatus');
                console.log('getGameStatus: game', game);
                if (game) {
                    setGame(game);
                }
            } catch (err) {
                setGame(null);
                console.log('Error', err);
            } finally {
                setLoading(false);
            }
        };

        getGameStatus();
    }, []);

    useEffect(() => {
        const contentLinkClick = (e: MouseEvent): void => {
            const element = e.target as HTMLAnchorElement;
            if (element && element.tagName === 'A' && 'href' in element) {
                const link: string | undefined = element.href;
                if (link && link.startsWith(window.location.origin)) {
                    swRequest('addHistory', { link });
                }
            }
        };

        document.getElementById('content').addEventListener('click', contentLinkClick);

        return () => {
            document.getElementById('content').removeEventListener('click', contentLinkClick);
        };
    }, []);

    const startAction = async () => {
        setLoading(true);
        const game: any = await swRequest('gameStart');
        console.log('startAction: game', game);

        setGame(game);
        setLoading(false);
    };

    const endAction = async () => {
        setGame({});
        swRequest('endGame');
    };

    if (loading) return '...';

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
                <div className='text'>
                    Done in <b>{game.moves}</b> moves and <b>{Date.now() - game.startedAt}</b>ms!
                </div>
                <button onClick={startAction}>Start again</button>
            </div>
        );
    }

    return (
        <div className='container'>
            <div className='text'>Find this page by following the links in the content:</div>
            <div className='text target-title'>{game.target.title}</div>
            <div className='text'>
                Moves: <b>{game.moves}</b>
            </div>
            <button onClick={startAction}>Reset game</button>
            <button onClick={endAction}>End game</button>
        </div>
    );
}

export default App;
