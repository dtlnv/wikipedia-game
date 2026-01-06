import { type FC, useState, useEffect, useRef } from 'react';
import { serviceWorkerRequest } from '../../utils';

interface MovesInterface {
    history: string[];
    startPageTitle: string;
    open?: boolean;
}
/**
 * Moves component renders the number of moves and the list of visited pages (history) when the "Moves" link is clicked
 */
export const Moves: FC<MovesInterface> = ({ history, startPageTitle, open = false }) => {
    const [showHistory, setShowHistory] = useState<boolean>(open);
    const listRef = useRef<HTMLOListElement>(null);

    useEffect(() => {
        if (showHistory && listRef.current && typeof listRef.current.scrollTo === 'function') {
            listRef.current.scrollTo(0, listRef.current.scrollHeight);
        }
    }, [showHistory, history]);

    const toggleHistory = async () => {
        const newState = !showHistory;
        setShowHistory(newState);
        await serviceWorkerRequest('showHistory', { opened: newState });
    };

    return (
        <div className='text'>
            <a onClick={toggleHistory} data-testid='moves-link'>
                {chrome.i18n.getMessage('moves')}: <strong>{history.length}</strong>
            </a>
            {showHistory && (
                <ol className='moves-list' start={0} ref={listRef}>
                    <li>{startPageTitle}</li>
                    {history.map((title) => (
                        <li key={title}>{title}</li>
                    ))}
                </ol>
            )}
        </div>
    );
};
