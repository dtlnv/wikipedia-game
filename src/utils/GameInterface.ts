export default interface GameInterface {
    state?: 'progress' | 'finish';
    target?: { url?: string; title?: string };
    history?: string[];
    hint?: string | null;
    startedAt?: number;
    endedAt?: number;
    startPageTitle?: string;
}
