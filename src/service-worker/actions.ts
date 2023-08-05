// https://ru.wikipedia.org/wiki/Special:Random

import { getPageTitle, randomPage, serializer } from './helpers';

interface ActionInterface {
    params?: { [key: string]: any };
    sender?: chrome.runtime.MessageSender;
}

interface GameInterface {
    state?: 'progress' | 'finish';
    target?: { url?: string; title?: string };
    history?: string[];
    hint?: string | null;
    startedAt?: number;
    endedAt?: number;
    startPageTitle?: string;
}

let game: GameInterface = {};

async function gameStart({ sender }: ActionInterface): Promise<object> {
    game.target = await randomPage(sender);
    game.state = 'progress';
    game.hint = null;
    game.startedAt = Date.now();
    game.endedAt = 0;
    game.history = [];
    game.startPageTitle = getPageTitle(sender.url);

    return serializer(game);
}

async function addHistory({ params }: ActionInterface): Promise<object> {
    if (game && params.link) {
        game.history.push(params.link);
    }
    return serializer(game);
}

async function addHint({ params }: ActionInterface): Promise<object> {
    if (game && params.hint) {
        game.hint = params.hint;
    }
    return serializer(game);
}

async function endGame({}: ActionInterface): Promise<object> {
    game = {};
    return null;
}

async function gameStatus({ sender }: ActionInterface): Promise<object> {
    if (Object.keys(game).length === 0 || !game.state) {
        return null;
    }

    const currentUrl = decodeURIComponent(sender.url); //decodeURIComponent(game.history[game.history.length - 1]);

    if (game.target.url === currentUrl) {
        game.state = 'finish';
        game.endedAt = Date.now();
    }

    return serializer(game);
}

export default {
    gameStart,
    gameStatus,
    addHistory,
    endGame,
    addHint,
};
