import GameInterface from '../GameInterface';
import { getPageTitle, getRandomPage } from './helpers';

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
    }

    end(): null {
        this.store = {};
        return null;
    }

    get(): GameInterface {
        if (Object.keys(this.store).length === 0 || !this.store.state) {
            return null;
        }

        // const object: GameInterface = { ...this.store };
        // object.moves = object.history.length;
        // delete object.history;
        return this.store;
    }

    check(currentUrl: string): GameInterface {
        if (Object.keys(this.store).length === 0 || !this.store.state) {
            return null;
        }

        currentUrl = decodeURIComponent(currentUrl);
        if (this.store.target && this.store.target.url === currentUrl) {
            this.store.state = 'finish';
            this.store.endedAt = Date.now();
        }

        return this.get();
    }

    inProgress(): boolean {
        return this.store.state === 'progress';
    }

    addHistory(link: string): void {
        if (this.store.history) {
            this.store.history.push(link);
        }
    }

    addHint(hint: string): void {
        if (hint) {
            this.store.hint = hint;
        }
    }
}

export default Game;
