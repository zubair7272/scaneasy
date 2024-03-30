// TimerContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    return () => {
      clearInterval(timer);
    };
  }, [timer]);

  const startTimer = (orderId) => {
    clearInterval(timer); // Clear previous timer if exists

    const endTime = new Date().getTime() + 10 * 60 * 1000; // 10 minutes in milliseconds

    const intervalId = setInterval(() => {
      const currentTime = new Date().getTime();
      const remainingTime = endTime - currentTime;

      if (remainingTime <= 0) {
        clearInterval(intervalId);
        setTimer(null); // Timer expired
      } else {
        setTimer(intervalId);
      }
    }, 1000); // Update every second
  };

  return (
    <TimerContext.Provider value={{ timer, startTimer }}>
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = () => useContext(TimerContext);
