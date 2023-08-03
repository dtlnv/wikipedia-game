import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import './app.scss';

const newElement = document.createElement('div');
newElement.id = 'wiki-quiz-root';
document.body.appendChild(newElement);

const container = document.getElementById('wiki-quiz-root');
const root = ReactDOM.createRoot(container);
root.render(<App />);
