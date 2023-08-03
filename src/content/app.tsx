import React, { useState } from 'react';
import swRequest from './sw-request';

function App() {
    const startAction = async () => {
        const r = await swRequest('getFinishPage');
        console.log('r', r);
    };

    return (
        <div className='container'>
            <h1>Hello, world !</h1>
            <button onClick={startAction}>start</button>
        </div>
    );
}

export default App;
