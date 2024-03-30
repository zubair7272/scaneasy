// _app.js
import React from 'react';
import { TimerProvider } from '../context/TimerContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <TimerProvider>
      <Component {...pageProps} />
    </TimerProvider>
  );
}

export default TimerC;
