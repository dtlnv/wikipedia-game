export default interface GameInterface {
    state?: 'progress' | 'finish';
    target?: { url?: string; title?: string };
    history?: string[];
    moves?: number;
    hint?: string | null;
    startedAt?: number;
    endedAt?: number;
    startPageTitle?: string;
}
