import { GameInterface } from '../common-types';

export interface GameClassInterface {
    _game: GameInterface;
    start: (sender: any) => Promise<GameInterface>;
    end: () => void;
    get: () => GameInterface;
    check: (currentUrl: string) => Promise<GameInterface>;
    addHint: (hint: string) => Promise<GameInterface>;
    isGame: () => Promise<boolean>;
    save: () => void;
}

export interface ActionInterface {
    params?: { [key: string]: any };
    sender?: chrome.runtime.MessageSender;
}

export interface ContentListenerInterface {
    (message: any, sender: chrome.runtime.MessageSender, sendResponse: (response: any) => void): Promise<void>;
}
