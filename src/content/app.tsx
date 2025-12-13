import { useEffect, useState } from 'react';
import { FinishScreen, GameScreen, StartScreen } from './screens';
import { serviceWorkerRequest } from './utils';
import { derestrictions, restrictions } from './utils/helpers';
import './app.scss';

const App = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [game, setGame] = useState<PartialGameState>({});
    const [isVisible, setIsVisible] = useState<boolean>(false);

    // Get visibility state from localStorage
    useEffect(() => {
        const stored = localStorage.getItem('appVisible');
        if (stored !== null) {
            setIsVisible(JSON.parse(stored));
        }
    }, []);

    // Persist visibility state to localStorage
    useEffect(() => {
        localStorage.setItem('appVisible', JSON.stringify(isVisible));
    }, [isVisible]);

    // Get game status from service worker and set it to state
    useEffect(() => {
        const getGameStatus = async () => {
            try {
                const game: PartialGameState = await serviceWorkerRequest('gameStatus');

                if (game) {
                    setGame(game);
                    restrictions(); // Disable search
                    if (game.state === 'finish') {
                        derestrictions(); // Enable search

                        // If the game is finished and the history is empty, then the game is over (for example, direct link)
                        if (game.history?.length === 0) {
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

    useEffect(() => {
        if (isVisible) {
            document.documentElement.classList.add('wiki-gaming');
        } else {
            document.documentElement.classList.remove('wiki-gaming');
        }

        return () => {
            document.documentElement.classList.remove('wiki-gaming');
        };
    }, [isVisible]);

    const startAction = async () => {
        setLoading(true);
        const game: PartialGameState = await serviceWorkerRequest('gameStart');
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

    const content = (() => {
        switch (game.state) {
            case 'finish':
                return <FinishScreen game={game} loading={loading} startAction={startAction} endAction={endAction} />;
            case 'progress':
                return (
                    <GameScreen game={game} loading={loading} startAction={startAction} endAction={endAction} setGame={setGame} />
                );
            default:
                return <StartScreen startAction={startAction} loading={loading} />;
        }
    })();

    const onCloseClick = () => {
        setIsVisible(false);
        localStorage.setItem('appVisible', 'false');
        document.documentElement.classList.remove('wiki-gaming');
    };

    const onShowClick = () => {
        setIsVisible(true);
        localStorage.setItem('appVisible', 'true');
        document.documentElement.classList.add('wiki-gaming');
    };

    return isVisible ? (
        <div className='wiki-quiz-app-container'>
            <div className='wiki-quiz-close' onClick={onCloseClick} title='Hide Wiki Game'>
                ×
            </div>
            {content}
        </div>
    ) : (
        <div className='wiki-quiz-show'>
            <button onClick={onShowClick}>Show Wiki Game</button>
        </div>
    );
};

export default App;
