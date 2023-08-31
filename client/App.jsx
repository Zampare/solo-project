import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Workouts from './Workouts';
import LogIn from './LogIn';
import SignUp from './SignUp';
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LogIn />} />
        <Route path='/workout' element={<Workouts />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
