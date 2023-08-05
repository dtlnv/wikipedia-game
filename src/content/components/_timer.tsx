import React, { useState, useEffect } from 'react';

interface TimerInterface {
    startTime: number;
    endTime?: number;
}

const Timer: React.FC<TimerInterface> = ({ startTime, endTime = 0 }) => {
    const [currentTime, setCurrentTime] = useState(Date.now());

    useEffect(() => {
        let intervalId: any;

        if (endTime) {
            setCurrentTime(endTime);
        } else {
            intervalId = setInterval(() => {
                setCurrentTime(Date.now());
            }, 1000);
        }

        return () => {
            clearInterval(intervalId);
        };
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
