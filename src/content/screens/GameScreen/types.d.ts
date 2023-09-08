import { GameInterface } from '../../../common-types';

export interface GameScreenInterface {
    game: GameInterface;
    loading: boolean;
    startAction: React.MouseEventHandler<HTMLButtonElement>;
    endAction: React.MouseEventHandler<HTMLButtonElement>;
    setGame: (game: GameInterface) => void;
}
