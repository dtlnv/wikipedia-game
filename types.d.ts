interface GameInterface {
    state?: 'progress' | 'finish';
    target?: { url?: string; title?: string };
    history?: string[];
    hint?: string | null;
    startedAt?: number;
    endedAt?: number;
    startPageTitle?: string;
}

interface FinishScreenInterface {
    game: GameInterface;
    loading: boolean;
    startAction: React.MouseEventHandler<HTMLButtonElement>;
    endAction: React.MouseEventHandler<HTMLButtonElement>;
}

interface GameScreenInterface {
    game: GameInterface;
    loading: boolean;
    startAction: React.MouseEventHandler<HTMLButtonElement>;
    endAction: React.MouseEventHandler<HTMLButtonElement>;
    setGame: (game: GameInterface) => void;
}

interface StartScreenInterface {
    startAction: React.MouseEventHandler<HTMLButtonElement>;
    loading: boolean;
}

interface LogoInterface {
    screen: 'start' | 'game' | 'finish';
}

interface MovesInterface {
    history: string[];
    startPageTitle: string;
    open?: boolean;
}

interface TimerInterface {
    startTime: number;
    endTime?: number;
}

interface GameClassInterface {
    _game: GameInterface;
    start: (sender: any) => Promise<GameInterface>;
    end: () => void;
    get: () => GameInterface;
    check: (currentUrl: string) => Promise<GameInterface>;
    addHint: (hint: string) => Promise<GameInterface>;
    isGame: () => Promise<boolean>;
    save: () => void;
}

interface ActionInterface {
    params?: { [key: string]: any };
    sender?: chrome.runtime.MessageSender;
}

interface ContentListenerInterface {
    (message: any, sender: chrome.runtime.MessageSender, sendResponse: (response: any) => void): Promise<void>;
}

interface ServiceWorkerRequestInterface {
    (action: string, params?: object): Promise<any>;
}
