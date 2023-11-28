import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import Mobile from './Mobile.tsx';

ReactDOM?.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

ReactDOM?.createRoot(document.getElementById('mobile-root')!).render(
  <React.StrictMode>
    <Mobile />
  </React.StrictMode>,
);