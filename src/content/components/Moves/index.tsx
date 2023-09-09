import React, { useState } from 'react';
import { MovesInterface } from './types';

/**
 * Moves component renders the number of moves and the list of visited pages (history) when the "Moves" link is clicked
 */
const Moves: React.FC<MovesInterface> = ({ history, startPageTitle, open = false }) => {
    const [showHistory, setShowHistory] = useState<boolean>(open); // Should show history state (default: false)

    return (
        <div className='text'>
            <a onClick={() => setShowHistory((prev) => !prev)}>
                Moves: <strong>{history.length}</strong>
            </a>
            {showHistory && (
                <ol className='moves-list' start={0}>
                    <li>{startPageTitle}</li>
                    {history.map((title) => (
                        <li key={title}>{title}</li>
                    ))}
                </ol>
            )}
        </div>
    );
};

export default Moves;
