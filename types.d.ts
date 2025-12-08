interface GameState {
    state: 'progress' | 'finish';
    target: { url: string; title: string } | null;
    history: string[];
    hint: string | null;
    startedAt: number;
    endedAt: number;
    startPageTitle: string;
    showHistory?: boolean;
}

type PartialGameState = Partial<GameState>;

declare module '*.scss' {
    const content: { [className: string]: string };

    export default content;
}
