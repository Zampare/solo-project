import React from 'react';
import { render } from 'react-dom';
import App from './App';
import { createRoot } from 'react-dom/client';
import '/client/styles.css';
const Router = () => {
  return (
    <div>
      <App />
    </div>
  );
};
const root = createRoot(document.getElementById('root'));
root.render(<Router />);
