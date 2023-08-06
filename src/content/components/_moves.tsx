import React, { useState } from 'react';

interface MovesInterface {
    history: string[];
    startPageTitle: string;
}

const Moves: React.FC<MovesInterface> = ({ history, startPageTitle }) => {
    const [showHistory, setShowHistory] = useState<boolean>(false);

    return (
        <div className='text'>
            <a onClick={() => setShowHistory((prev) => !prev)}>
                Moves: <strong>{history.length}</strong>
            </a>
            {showHistory && (
                <ul className='moves-list'>
                    <li>0. {startPageTitle}</li>
                    {history.map((title, index) => (
                        <li key={title}>
                            {index + 1}. {title}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Moves;
