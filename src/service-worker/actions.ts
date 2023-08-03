// https://ru.wikipedia.org/wiki/Special:Random

import { randomPage, serializer } from './helpers';

interface ActionInterface {
    params?: { [key: string]: any };
    sender?: chrome.runtime.MessageSender;
}

interface GameInterface {
    state?: 'progress' | 'finish';
    target?: { url?: string; title?: string };
    history?: string[];
    startedAt?: number;
}

let game: GameInterface = {};

async function gameStart({ sender }: ActionInterface): Promise<object> {
    game.target = await randomPage(sender);
    game.state = 'progress';
    game.startedAt = Date.now();
    game.history = [];

    return serializer(game);
}

async function addHistory({ params }: ActionInterface): Promise<object> {
    if (game && params.link) {
        game.history.push(params.link);
    }
    return serializer(game);
}

async function endGame({}: ActionInterface): Promise<object> {
    game = {};
    return null;
}

async function gameStatus({}: ActionInterface): Promise<object> {
    if (Object.keys(game).length === 0 || !game.state) {
        return null;
    }

    if (game.target.url === decodeURIComponent(game.history[game.history.length - 1])) {
        game.state = 'finish';
    }

    return serializer(game);
}

async function getRandomPage({ sender }: ActionInterface): Promise<object> {
    return randomPage(sender);
}

export default {
    getRandomPage,
    gameStart,
    gameStatus,
    addHistory,
    endGame,
};
