import { GameInterface } from '../common-types';
import { GameClassInterface } from './types';
import { getPageTitle, getRandomPage } from './helpers';
import Storage from './storage';

/**
 * The main logic of the game.
 * It is responsible for starting, ending, changing and checking the game.
 * It also stores the game state in the chrome storage.
 */
class Game implements GameClassInterface {
    _game: GameInterface = {};

    /**
     * Start the game.
     * @param sender
     * @returns Full game state
     */
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

    /**
     * End the game.
     */
    end(): void {
        this._game = {};
        this.save();
    }

    /**
     * Get the game state.
     * @returns Full game state
     */
    get(): GameInterface {
        return this._game;
    }

    /**
     * Check the game state.
     * @param currentUrl
     * @returns Null if the game is not started, otherwise the full game state
     */
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

    /**
     * Add a hint to the game.
     * @param hint
     * @returns Null if the game is not started, otherwise the full game state
     */
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

    /**
     * Check if the game is started.
     * @returns True if the game is started, otherwise false
     */
    async isGame(): Promise<boolean> {
        if (Object.keys(this._game).length === 0) {
            const loadStorage = await Storage.get();
            if (loadStorage) {
                this._game = loadStorage;
            }
        }

        return Object.keys(this._game).length !== 0 && !!this._game.state && !!this._game.target;
    }

    /**
     * Save the game state in the chrome storage.
     */
    save(): void {
        Storage.save(this._game);
    }
}

export default Game;
