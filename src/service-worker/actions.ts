import GameInterface from '../GameInterface';
import Game from './game';

interface ActionInterface {
    params?: { [key: string]: any };
    sender?: chrome.runtime.MessageSender;
}

const game = new Game();

const gameStart = async ({ sender }: ActionInterface): Promise<GameInterface> => {
    await game.start(sender);
    return game.get();
};

const addHistory = ({ params }: ActionInterface): GameInterface => {
    if (game.inProgress() && params.link) {
        game.addHistory(params.link);
    }
    return game.get();
};

const addHint = ({ params }: ActionInterface): GameInterface => {
    if (game.inProgress() && params.hint) {
        game.addHint(params.hint);
    }
    return game.get();
};

const endGame = ({}: ActionInterface): null => {
    return game.end();
};

const gameStatus = ({ sender }: ActionInterface): null | GameInterface => {
    if (game.inProgress()) {
        return game.check(sender.url);
    }
    return null;
};

export default {
    gameStart,
    gameStatus,
    addHistory,
    endGame,
    addHint,
};
