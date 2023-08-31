import React from 'react';
import { render } from 'react-dom';
import Workouts from './Workouts';
import { createRoot } from 'react-dom/client';
import '/client/styles.css';
const Router = () => {
  return (
    <div>
      <Workouts />
    </div>
  );
};
const root = createRoot(document.getElementById('root'));
root.render(<Router />);
