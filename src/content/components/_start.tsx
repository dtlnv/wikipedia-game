import React from 'react';

interface StartScreenInterface {
    startAction: React.MouseEventHandler<HTMLButtonElement>;
}

const StartScreen: React.FC<StartScreenInterface> = ({ startAction }) => {
    return (
        <div className='container'>
            <button onClick={startAction}>Start game</button>
        </div>
    );
};

export default StartScreen;
