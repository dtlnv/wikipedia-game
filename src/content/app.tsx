import React, { useEffect, useState } from 'react';
import swRequest from './sw-request';

interface GameInterface {
    target?: { [key: string]: string };
    inprogress?: boolean;
    moves?: number;
    startedAt?: string;
}

function App() {
    const [loading, setLoading] = useState<boolean>(true);
    const [game, setGame] = useState<GameInterface>({});

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

    const startAction = async () => {
        setLoading(true);
        const game: any = await swRequest('gameStart');
        console.log('startAction: game', game);

        setGame(game);
        setLoading(false);
    };

    if (loading) return '...';

    if (!game.inprogress) {
        return (
            <div className='container'>
                <button onClick={startAction}>start game</button>
            </div>
        );
    }

    return (
        <div className='container'>
            Find this page by going throgh links:
            <br />
            <span>{game.target.title}</span>
            <br />
            Moves:
            <span>{game.moves}</span>
            <br />
            <button onClick={startAction}>reset game</button>
        </div>
    );
}

export default App;
