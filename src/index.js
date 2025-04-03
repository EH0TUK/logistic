import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './i18n';
import App from './App';
import './styles/style.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Suspense fallback={<div>Loading...</div>}>
    <App />
  </Suspense>
);