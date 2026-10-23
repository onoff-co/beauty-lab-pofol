import React from 'react';
import { createRoot } from 'react-dom/client';
import PlatformPage from './PlatformPage.jsx';
import './platform.css';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PlatformPage />
  </React.StrictMode>,
);
