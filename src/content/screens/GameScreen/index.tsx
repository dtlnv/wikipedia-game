import { type FC, useEffect, useState } from 'react';
import { Loader, Logo, Moves, Timer } from '../../components';
import { serviceWorkerRequest } from '../../utils';

const CategoriesSelector = '#catlinks .mw-normal-catlinks ul a, #articleCategories ul.categories li.category a';

interface GameScreenInterface {
    game: PartialGameState;
    loading: boolean;
    startAction: React.MouseEventHandler<HTMLButtonElement>;
    endAction: React.MouseEventHandler<HTMLButtonElement>;
    setGame: (game: PartialGameState) => void;
}

/**
 * In progress game screen with game status and buttons to get hint, start new game or end game
 */
const GameScreen: FC<GameScreenInterface> = ({ game, loading, startAction, endAction, setGame }) => {
    const [showHintForHint, setShowHintForHint] = useState<boolean>(false);

    useEffect(() => {
        setShowHintForHint(false);
    }, [loading]);

    const hintAction = async () => {
        // Do it on frontend side because it is impossible to parse html in the service worker (no DOMParser)
        if (!game.target || !game.target.url) {
            return;
        }

        const htmlString = await (await fetch(game.target.url)).text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, 'text/html');
        const categories: string[] = [];
        // Parse the target page to get categories from the bottom of the page
        doc.querySelectorAll(CategoriesSelector).forEach((element) => {
            categories.push(element.textContent);
        });

        const hint = categories.join('; ');

        setGame({ ...game, hint }); // Update game state in app
        serviceWorkerRequest('addHint', { hint }); // Update game status in service worker
        setShowHintForHint(true);
    };

    return (
        <>
            <Logo screen='game' />
            <div className='text center'>{chrome.i18n.getMessage('find_this_page_by_following_links')}:</div>
            <div className='text center target-title' title={game?.target?.url ? game.target.url : ''}>
                {loading ? '...' : game?.target?.title ? game.target.title : ''}
            </div>
            <div className='text'>
                {chrome.i18n.getMessage('time')}: {!loading && <Timer startTime={game.startedAt} />}
            </div>
            {game.history && game.startPageTitle && (
                <Moves history={game.history} startPageTitle={game.startPageTitle} open={game.showHistory} />
            )}
            <div className='buttons-block'>
                <button
                    type='button'
                    className='hint-button'
                    onClick={hintAction}
                    disabled={loading || !!game.hint}
                    title={!loading ? (game?.hint ?? undefined) : undefined}
                >
                    {chrome.i18n.getMessage('hint')} {!loading && game.hint && '👀'}
                </button>
                {showHintForHint && <div className='center'>^^ {chrome.i18n.getMessage('hover_the_button')} ^^</div>}
                {loading ? (
                    <Loader />
                ) : (
                    <button type='button' onClick={startAction}>
                        {chrome.i18n.getMessage('reset_game')}
                    </button>
                )}
                <button type='button' onClick={endAction} disabled={loading}>
                    {chrome.i18n.getMessage('end_game')}
                </button>
            </div>
        </>
    );
};

export default GameScreen;
