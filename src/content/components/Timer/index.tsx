import React, { useState, useEffect } from 'react';

/**
 * Timer component renders the time spent on the game
 */
const Timer: React.FC<TimerInterface> = ({ startTime, endTime = 0 }) => {
    const [currentTime, setCurrentTime] = useState(Date.now()); // Current time state

    useEffect(() => {
        let intervalId: any;

        if (endTime) {
            // Set current time to the end time if it's provided
            setCurrentTime(endTime);
        } else {
            // Update current time every second
            intervalId = setInterval(() => {
                setCurrentTime(Date.now());
            }, 1000);
        }

        return () => {
            // Clear interval when the component unmounts
            clearInterval(intervalId);
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const timeDifference = currentTime - startTime;
    const seconds = Math.floor((timeDifference / 1000) % 60);
    const minutes = Math.floor((timeDifference / 1000 / 60) % 60);
    const hours = Math.floor(timeDifference / 1000 / 60 / 60);

    return (
        <strong>
            {`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}
        </strong>
    );
};

export default Timer;
