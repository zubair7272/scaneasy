import React, { useState, useEffect } from 'react';
import styles from './CircularCountdownTimer.module.css';

const CircularCountdownTimer = ({ duration }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    const countdownTimer = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft(prevTimeLeft => prevTimeLeft - 1);
      } else {
        clearInterval(countdownTimer);
      }
    }, 1000);

    return () => clearInterval(countdownTimer);
  }, [timeLeft]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className={styles.countdownContainer}>
      <div className={styles.countdownWrapper}>
        <div className={styles.countdown}>
          <div className={styles.countdownTimer}>
            <div className={styles.timerLabel}>Time Remaining</div>
            <div className={styles.time}>{formatTime(timeLeft)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CircularCountdownTimer;
