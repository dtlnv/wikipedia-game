import GameInterface from '../utils/GameInterface';
import { getPageTitle, getRandomPage } from '../utils/helpers';

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
        return this.store;
    }

    check(currentUrl: string): GameInterface {
        if (!this.isGame()) {
            return null;
        }

        currentUrl = decodeURIComponent(currentUrl);
        if (this.store.target && this.store.target.url === currentUrl) {
            this.store.state = 'finish';
            this.store.endedAt = Date.now();
        }

        return this.get();
    }

    isGame(): boolean {
        return Object.keys(this.store).length !== 0 && !!this.store.state;
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
