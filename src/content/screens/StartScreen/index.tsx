import { FC } from 'react';
import { Loader, Logo } from '../../components';

interface StartScreenInterface {
    startAction: React.MouseEventHandler<HTMLButtonElement>;
    loading: boolean;
}

/**
 * Screen with button to start game
 */
const StartScreen: FC<StartScreenInterface> = ({ startAction, loading }) => {
    return (
        <>
            <Logo screen='start' />
            {loading ? <Loader /> : <button onClick={startAction}>Start game</button>}
        </>
    );
};

export default StartScreen;
