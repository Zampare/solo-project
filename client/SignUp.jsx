import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const usernameChangeHandle = e => {
    setusername(e.target.value);
  };
  const passwordChangeHandle = e => {
    setpassword(e.target.value);
  };
  const navigate = useNavigate();
  const SignUpAttempt = async () => {
    const creds = { username, password };
    const result = await fetch('/api/signup', {
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
  return (
    <div id='loginpage'>
      Username:<input type='text' onChange={usernameChangeHandle}></input>
      Password:
      <input type='text' onChange={passwordChangeHandle}></input>
      <div id='loginbuttonbox'>
        <button onClick={SignUpAttempt}>Sign Up</button>
      </div>
    </div>
  );
};
export default SignUp;
