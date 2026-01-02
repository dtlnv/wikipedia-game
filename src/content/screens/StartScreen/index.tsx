import type { FC } from 'react';
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
            {loading ? <Loader /> : <button onClick={startAction}>{chrome.i18n.getMessage('start_game')}</button>}
        </>
    );
};

export default StartScreen;
