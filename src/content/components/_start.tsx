import React from 'react';

interface StartScreenInterface {
    startAction: React.MouseEventHandler<HTMLButtonElement>;
}

const StartScreen: React.FC<StartScreenInterface> = ({ startAction }) => {
    return (
        <>
            <div className='logo'>
                <img src={chrome.runtime.getURL('images/logo.png')} />
            </div>
            <button onClick={startAction}>Start game</button>
        </>
    );
};

export default StartScreen;
