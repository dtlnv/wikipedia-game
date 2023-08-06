import GameInterface from '../utils/GameInterface';
import Game from './game';

/**
 * Such a router.
 * Actions that get/set information from/in the Game class.
 */
interface ActionInterface {
    params?: { [key: string]: any };
    sender?: chrome.runtime.MessageSender;
}

const game = new Game();

const gameStart = async ({ sender }: ActionInterface): Promise<GameInterface> => {
    return await game.start(sender);
};

const addHint = async ({ params }: ActionInterface): Promise<GameInterface> => {
    return await game.addHint(params.hint);
};

const endGame = ({}: ActionInterface): void => {
    return game.end();
};

const gameStatus = async ({ sender }: ActionInterface): Promise<null | GameInterface> => {
    return await game.check(sender.url);
};

export default {
    gameStart,
    gameStatus,
    endGame,
    addHint,
};
