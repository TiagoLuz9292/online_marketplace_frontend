import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { createRoot } from 'react-dom/client'; //
import './index.css';
import App from './App';

// Find the root element in your HTML
const container = document.getElementById('root');

// Create a root using createRoot
const root = createRoot(container);

// Render your app
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);