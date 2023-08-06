import GameInterface from '../utils/GameInterface';
import { getPageTitle, getRandomPage } from '../utils/helpers';
import Storage from './storage';

/**
 * The main logic of the game.
 */
interface GameClassInterface {
    store: GameInterface;
    start: (sender: any) => Promise<void>;
    end: () => void;
    get: () => GameInterface;
    check: (currentUrl: string) => Promise<GameInterface>;
    addHint: (hint: string) => Promise<void>;
    isGame: () => Promise<boolean>;
    save: () => void;
}

class Game implements GameClassInterface {
    store: GameInterface = {};

    async start(sender: any): Promise<void> {
        this.store.target = await getRandomPage(sender);
        this.store.state = 'progress';
        this.store.hint = null;
        this.store.startedAt = Date.now();
        this.store.endedAt = 0;
        this.store.history = [];
        this.store.startPageTitle = getPageTitle(sender.url);
        this.save();
    }

    end(): void {
        this.store = {};
        this.save();
    }

    get(): GameInterface {
        return this.store;
    }

    async check(currentUrl: string): Promise<GameInterface> {
        if (!(await this.isGame())) {
            return null;
        }

        if (!currentUrl.includes('index.php')) {
            this.store.history.push(getPageTitle(currentUrl));
        }

        currentUrl = decodeURIComponent(currentUrl);
        if (this.store.target && this.store.target.url === currentUrl) {
            this.store.state = 'finish';
            this.store.endedAt = Date.now();
        }

        this.save();

        return this.get();
    }

    async addHint(hint: string): Promise<void> {
        if (!(await this.isGame())) {
            return null;
        }

        if (hint) {
            this.store.hint = hint;
        }

        this.save();
    }

    async isGame(): Promise<boolean> {
        if (Object.keys(this.store).length === 0) {
            const loadStorage = await Storage.get();
            if (loadStorage) {
                this.store = loadStorage;
            }
        }

        return Object.keys(this.store).length !== 0 && !!this.store.state;
    }

    save(): void {
        Storage.save(this.store);
    }
}

export default Game;
