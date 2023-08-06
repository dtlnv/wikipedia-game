import GameInterface from '../utils/GameInterface';
import { getPageTitle, getRandomPage } from '../utils/helpers';
import Storage from './storage';

class Game {
    sender: any;
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

    end(): null {
        this.store = {};
        this.save();
        return null;
    }

    get(): GameInterface {
        return this.store;
    }

    async check(currentUrl: string): Promise<GameInterface> {
        if (!(await this.isGame())) {
            return null;
        }

        currentUrl = decodeURIComponent(currentUrl);
        if (this.store.target && this.store.target.url === currentUrl) {
            this.store.state = 'finish';
            this.store.endedAt = Date.now();
        }

        this.save();

        return this.get();
    }

    async addHistory(link: string): Promise<void> {
        if (!(await this.isGame())) {
            return null;
        }

        if (this.store.history) {
            this.store.history.push(link);
        }

        this.save();
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
            this.store = await Storage.get();
        }

        return Object.keys(this.store).length !== 0 && !!this.store.state;
    }

    save() {
        Storage.save(this.store);
    }
}

export default Game;
