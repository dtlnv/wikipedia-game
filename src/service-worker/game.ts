import GameInterface from '../utils/GameInterface';
import { getPageTitle, getRandomPage } from '../utils/helpers';
import Storage from './storage';

/**
 * The main logic of the game.
 */
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

class Game implements GameClassInterface {
    _game: GameInterface = {};

    async start(sender: any): Promise<GameInterface> {
        this._game.target = await getRandomPage(sender);
        this._game.state = 'progress';
        this._game.hint = null;
        this._game.startedAt = Date.now();
        this._game.endedAt = 0;
        this._game.history = [];
        this._game.startPageTitle = getPageTitle(sender.url);
        this.save();

        return this.get();
    }

    end(): void {
        this._game = {};
        this.save();
    }

    get(): GameInterface {
        return this._game;
    }

    async check(currentUrl: string): Promise<GameInterface> {
        if (!(await this.isGame())) {
            return null;
        }

        if (this._game.state === 'progress') {
            const currentPageTitle = getPageTitle(currentUrl);
            if (
                !currentUrl.includes('index.php') &&
                !currentPageTitle.startsWith(this._game.history[this._game.history.length - 1]) &&
                this._game.startPageTitle !== currentPageTitle
            ) {
                this._game.history.push(getPageTitle(currentUrl));
            }

            currentUrl = decodeURIComponent(currentUrl);
            if (this._game.target && this._game.target.url === currentUrl) {
                this._game.state = 'finish';
                this._game.endedAt = Date.now();
            }

            this.save();
        }

        return this.get();
    }

    async addHint(hint: string): Promise<GameInterface> {
        if (!(await this.isGame())) {
            return null;
        }

        if (hint) {
            this._game.hint = hint;
        }

        this.save();

        return this.get();
    }

    async isGame(): Promise<boolean> {
        if (Object.keys(this._game).length === 0) {
            const loadStorage = await Storage.get();
            if (loadStorage) {
                this._game = loadStorage;
            }
        }

        return Object.keys(this._game).length !== 0 && !!this._game.state && !!this._game.target;
    }

    save(): void {
        Storage.save(this._game);
    }
}

export default Game;
