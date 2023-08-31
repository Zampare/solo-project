import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LogIn = () => {
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const usernameChangeHandle = e => {
    setusername(e.target.value);
  };
  const passwordChangeHandle = e => {
    setpassword(e.target.value);
  };
  const navigate = useNavigate();
  const logInAttempt = async () => {
    const creds = { username, password };
    const result = await fetch('/api/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(creds),
    });
    if (result.status === 200) {
      navigate('/workout');
    }
  };
  const signUpRedirect = () => {
    navigate('/signup');
  };
  return (
    <div id='loginpage'>
      Username:<input type='text' onChange={usernameChangeHandle}></input>
      Password:
      <input type='password' onChange={passwordChangeHandle}></input>
      <div id='loginbuttonbox'>
        <button onClick={logInAttempt}>Sign In</button>
        <button onClick={signUpRedirect}>Sign up</button>
      </div>
    </div>
  );
};
export default LogIn;
