import Game from './game';

interface ActionInterface {
    params?: { [key: string]: any };
    sender?: chrome.runtime.MessageSender;
}

/**
 * Such a router.
 * Actions that get/set information from/in the Game class.
 */

const game = new Game();

const gameStart = async ({ sender }: ActionInterface): Promise<Partial<GameState> | null> => {
    return await game.start(sender);
};

const addHint = async ({ params }: ActionInterface): Promise<Partial<GameState> | null> => {
    if (!params) return null;

    return await game.addHint(params.hint);
};

const endGame = (): void => {
    return game.end();
};

const gameStatus = async ({ sender }: ActionInterface): Promise<Partial<GameState> | null> => {
    console.log('Checking game status from', sender);
    return await game.check(sender?.url);
};

const showHistory = async ({ params }: ActionInterface): Promise<Partial<GameState> | null> => {
    if (!params) return null;

    return await game.showHistory(params.opened);
};

export default {
    gameStart,
    gameStatus,
    endGame,
    addHint,
    showHistory,
};
