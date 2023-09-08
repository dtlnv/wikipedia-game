import React from 'react';
import { StartScreenInterface } from './types';
import { Logo } from '../../components';

/**
 * StartScreen component renders start screen with button to start game
 */
const StartScreen: React.FC<StartScreenInterface> = ({ startAction }) => {
    return (
        <>
            <Logo screen='start' />
            <button onClick={startAction}>Start game</button>
        </>
    );
};

export default StartScreen;
