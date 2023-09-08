import { GameInterface } from '../../../common-types';

export interface FinishScreenInterface {
    game: GameInterface;
    loading: boolean;
    startAction: React.MouseEventHandler<HTMLButtonElement>;
    endAction: React.MouseEventHandler<HTMLButtonElement>;
}
