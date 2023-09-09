import { GameInterface } from '../common-types';
import { ActionInterface, GameClassInterface } from './types';
import Game from './game';

/**
 * Such a router.
 * Actions that get/set information from/in the Game class.
 */

const game: GameClassInterface = new Game();

const gameStart = async ({ sender }: ActionInterface): Promise<GameInterface> => {
    return await game.start(sender);
};

const addHint = async ({ params }: ActionInterface): Promise<GameInterface> => {
    return await game.addHint(params.hint);
};

const endGame = (): void => {
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
