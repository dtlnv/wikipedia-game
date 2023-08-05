import React, { useEffect, useState } from 'react';
import swRequest from './sw-request';
import GameInterface from '../utils/GameInterface';
import { FinishScreen, GameScreen, Loader, StartScreen } from './components';

function App() {
    const [loading, setLoading] = useState<boolean>(true);
    const [game, setGame] = useState<GameInterface>({});

    // Receive game status.
    useEffect(() => {
        const getGameStatus = async () => {
            try {
                const game: GameInterface = await swRequest('gameStatus');
                console.log('game', game);

                if (game) {
                    setGame(game);
                    restrictions();
                    if (game.state === 'finish') {
                        derestrictions();
                        // for direct link
                        if (game.history.length === 0) {
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

        getGameStatus();
    }, []);

    // click on links handler
    useEffect(() => {
        const contentLinkClick = (e: MouseEvent): void => {
            const element = e.target as HTMLAnchorElement | HTMLSpanElement;
            let link: string | undefined;

            if (element.tagName === 'A' && 'href' in element) {
                link = element.href;
            }

            if (element.parentElement.tagName === 'A') {
                const parentLink = element.parentElement as HTMLAnchorElement;
                link = parentLink.href;
            }

            if (link && link.startsWith(window.location.origin)) {
                swRequest('addHistory', { link });
            }
        };

        document.addEventListener('click', contentLinkClick);

        return () => {
            document.removeEventListener('click', contentLinkClick);
        };
    }, []);

    const startAction = async () => {
        if (!window.location.href.includes('index.php')) {
            setLoading(true);
            const game: GameInterface = await swRequest('gameStart');
            if (game) {
                setGame(game);
                restrictions();
                setLoading(false);
            }
        }
    };

    const endAction = async () => {
        setGame({});
        derestrictions();
        swRequest('endGame');
    };

    if (loading && !game.state) return <Loader />;

    if (!game.state) {
        return <StartScreen startAction={startAction} />;
    }

    if (game.state === 'finish') {
        return <FinishScreen game={game} startAction={startAction} endAction={endAction} />;
    }

    if (game.state === 'progress') {
        return <GameScreen game={game} loading={loading} startAction={startAction} endAction={endAction} setGame={setGame} />;
    }

    return 'Something went wrong.';
}

function restrictions(): void {
    document.querySelectorAll<HTMLInputElement>('input[type=search], input[type=text]').forEach((input) => {
        input.disabled = true;
    });
}

function derestrictions(): void {
    document.querySelectorAll<HTMLInputElement>('input[type=search], input[type=text]').forEach((input) => {
        if (input.disabled) {
            input.disabled = false;
        }
    });
}

export default App;
