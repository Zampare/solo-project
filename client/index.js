import React from 'react';
import { render } from 'react-dom';
import App from './App';
import { createRoot } from 'react-dom/client';
const Router = () => {
  return (
    <div>
      hello
      <App />
    </div>
  );
};
const root = createRoot(document.getElementById('root'));
root.render(<Router />);
