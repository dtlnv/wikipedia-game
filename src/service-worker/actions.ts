// https://ru.wikipedia.org/wiki/Special:Random

interface ActionInterface {
    params?: { [key: string]: any };
    sender?: chrome.runtime.MessageSender;
}

/**
 * {
 *  inprogress
 *  target
 *  moves
 *  startedAt
 * }
 */

let game: { [key: string]: any } = {};

async function gameStart({ sender }: ActionInterface): Promise<object> {
    game.target = await randomPage(sender);
    game.inprogress = true;
    game.moves = 0;
    game.startedAt = Date.now();

    return game;
}

async function gameStatus({ params }: ActionInterface): Promise<object> {
    // console.log('game', game);

    // if (params) {
    //     game = params;
    // }

    if (!game.inprogress) {
        return null;
    }

    return game;
}

async function getRandomPage({ sender }: ActionInterface): Promise<object> {
    return randomPage(sender);
}

async function randomPage(sender: chrome.runtime.MessageSender): Promise<object> {
    const randomURL = sender.origin + '/wiki/Special:Random';

    const res = await fetch(randomURL);
    console.log('res', res);

    const url = decodeURIComponent(res.url);
    const title = url.split('/').pop().replace(/_/g, ' ');

    return { url, title };
}

export default {
    getRandomPage,
    gameStart,
    gameStatus,
};
