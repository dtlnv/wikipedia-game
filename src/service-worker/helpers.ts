// helpers

export async function randomPage(sender: chrome.runtime.MessageSender): Promise<object> {
    const randomURL = sender.origin + '/wiki/Special:Random';

    const res = await fetch(randomURL);
    console.log('res', res);

    const url = decodeURIComponent(res.url);
    const title = url.split('/').pop().replace(/_/g, ' ');
    // TODO: https://ru.wikipedia.org/wiki/ФК_«Манчестер_Юнайтед»_в_сезоне_2019/2020
    // todo: ё

    return { url, title };
}

export function serializer(game: { [key: string]: any }) {
    const object = { ...game };
    object.moves = object.history.length;
    delete object.history;
    return object;
}
