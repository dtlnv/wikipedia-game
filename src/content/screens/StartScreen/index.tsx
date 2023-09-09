import React from 'react';
import { StartScreenInterface } from './types';
import { Loader, Logo } from '../../components';

/**
 * Screen with button to start game
 */
const StartScreen: React.FC<StartScreenInterface> = ({ startAction, loading }) => {
    return (
        <>
            <Logo screen='start' />
            {loading ? <Loader /> : <button onClick={startAction}>Start game</button>}
        </>
    );
};

export default StartScreen;
