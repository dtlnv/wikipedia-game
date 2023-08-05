import React, { useState, useEffect } from 'react';

interface TimerInterface {
    startTime: number;
}

const Timer: React.FC<TimerInterface> = ({ startTime }) => {
    const [currentTime, setCurrentTime] = useState(Date.now());

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(Date.now());
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    const timeDifference = currentTime - startTime;
    const seconds = Math.floor((timeDifference / 1000) % 60);
    const minutes = Math.floor((timeDifference / 1000 / 60) % 60);
    const hours = Math.floor(timeDifference / 1000 / 60 / 60);

    return (
        <b>
            {`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}
        </b>
    );
};

export default Timer;
