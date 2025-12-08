import { getPageTitle, getRandomPage } from './helpers';
import Storage from './storage';

/**
 * The main logic of the game.
 * It is responsible for starting, ending, changing and checking the game.
 * It also stores the game state in the chrome storage.
 */
class Game {
    private _game: PartialGameState = {};

    /**
     * Start the game.
     * @param sender
     * @returns Full game state
     */
    async start(sender: any): Promise<PartialGameState> {
        const target = await getRandomPage(sender);

        this._game = {
            target,
            state: 'progress',
            hint: null,
            startedAt: Date.now(),
            endedAt: 0,
            history: [],
            startPageTitle: getPageTitle(sender.url),
            showHistory: false,
        };

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
    get(): PartialGameState {
        return this._game;
    }

    /**
     * Check the game state.
     * @param currentUrl
     * @returns Null if the game is not started, otherwise the full game state
     */
    async check(currentUrl?: string): Promise<PartialGameState | null> {
        if (!(await this.isGame())) {
            return null;
        }

        if (!currentUrl) {
            const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
            currentUrl = tabs[0].url || '';
        }

        const targetUrl = this._game.target?.url;
        if (!targetUrl) {
            return this.get();
        }

        const targetDomain = new URL(targetUrl).hostname;
        const tabDomain = new URL(currentUrl).hostname;

        if (targetDomain !== tabDomain) {
            return this.get();
        }

        if (this._game.state === 'progress') {
            const currentPageTitle = getPageTitle(currentUrl);
            const history = this._game.history || [];
            const lastHistoryItem = history[history.length - 1];

            if (
                !currentUrl.includes('index.php') &&
                !currentPageTitle.startsWith(lastHistoryItem) &&
                this._game.startPageTitle !== currentPageTitle
            ) {
                this._game.history = [...history, currentPageTitle];
            }

            const decodedUrl = decodeURIComponent(currentUrl);
            if (decodedUrl === targetUrl) {
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
    async addHint(hint: string): Promise<PartialGameState | null> {
        if (!(await this.isGame())) {
            return null;
        }

        if (hint) {
            this._game.hint = hint;
            this.save();
        }

        return this.get();
    }

    async showHistory(isOpened: boolean): Promise<PartialGameState | null> {
        if (!(await this.isGame())) {
            return null;
        }

        this._game.showHistory = isOpened;
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

        return !!(this._game.state && this._game.target);
    }

    /**
     * Save the game state in the chrome storage.
     */
    private save(): void {
        Storage.save(this._game);
    }
}

export default Game;
