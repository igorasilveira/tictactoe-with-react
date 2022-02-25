import { useEffect, useState } from 'react';

const useTimer = (start = true) => {
  const [time, setTime] = useState<number>(0);
  const [formattedTime, setFormattedTime] = useState<string>('00:00:00');
  const [intervalID, setIntervalID] = useState<number>();

  const startTimer = () => {
    if (typeof window !== 'undefined') {
      setIntervalID(window.setInterval(() => {
        // eslint-disable-next-line @typescript-eslint/no-shadow
        setTime((time) => time + 1);
      }, 1000));
    }
  };

  const formatTimeHHMMSS = () => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time - (hours * 3600)) / 60);
    const seconds = time - (hours * 3600) - (minutes * 60);

    const hoursFormatted = hours < 10 ? `0${hours}` : hours;
    const minutesFormatted = minutes < 10 ? `0${minutes}` : minutes;
    const secondsFormatted = seconds < 10 ? `0${seconds}` : seconds;

    setFormattedTime(`${hoursFormatted}:${minutesFormatted}:${secondsFormatted}`);
  };

  useEffect(() => {
    if (start) {
      startTimer();
    }
  }, []);

  useEffect(() => {
    formatTimeHHMMSS();
  }, [time]);

  const stopTimer = () => {
    clearInterval(intervalID);
  };

  const resetTimer = () => {
    setTime(0);
  };

  return {
    time,
    stopTimer,
    startTimer,
    resetTimer,
    formattedTime,
  };
};

export default useTimer;
