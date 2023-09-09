import React, { useEffect, useState } from 'react';
import { GameInterface } from '../common-types';
import { FinishScreen, GameScreen, StartScreen } from './screens';
import { serviceWorkerRequest } from './utils';
import { derestrictions, restrictions } from './utils/helpers';
import './app.scss';

const App = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [game, setGame] = useState<GameInterface>({});

    // Get game status from service worker and set it to state
    useEffect(() => {
        const getGameStatus = async () => {
            try {
                const game: GameInterface = await serviceWorkerRequest('gameStatus');

                if (game) {
                    setGame(game);
                    restrictions(); // Disable search
                    if (game.state === 'finish') {
                        derestrictions(); // Enable search

                        // If the game is finished and the history is empty, then the game is over (for example, direct link)
                        if (game.history.length === 0) {
                            endAction();
                        }
                    }
                } else {
                    setGame({});
                }
            } catch (err) {
                setGame({});
                console.log('Error', err);
            } finally {
                setLoading(false);
            }
        };

        getGameStatus();
    }, []);

    const startAction = async () => {
        setLoading(true);
        const game: GameInterface = await serviceWorkerRequest('gameStart');
        if (game) {
            setGame(game);
            restrictions();
            setLoading(false);
        }
    };

    const endAction = async () => {
        setGame({});
        derestrictions();
        serviceWorkerRequest('endGame');
    };

    if (!game.state) {
        return <StartScreen startAction={startAction} loading={loading} />;
    }

    if (game.state === 'finish') {
        return <FinishScreen game={game} loading={loading} startAction={startAction} endAction={endAction} />;
    }

    if (game.state === 'progress') {
        return <GameScreen game={game} loading={loading} startAction={startAction} endAction={endAction} setGame={setGame} />;
    }

    return 'Something went wrong.';
};

export default App;
