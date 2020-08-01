import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import authApi from '../../api/authApi';

import './Register.css';

function Register() {
  // Init state.
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [error, setError] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState(false);

  // Handle function
  const handleChange = (set) => (event) => set(event.target.value.trim());
  const handleSubmit = (event) => {
    event.preventDefault();

    if (password !== rePassword) {
      setError('Password and re-password must be the same.');
      setPassword('');
      setRePassword('');
      return;
    }

    const registerApiPost = async () => {
      try {
        const data = { email, userName, password };
        const { token } = await authApi.postRegister(data);
        const storageKey = 'jwtToken';
        const jwtToken = `Bearer ${token}`;

        localStorage.setItem(storageKey, jwtToken);
        setRegisterSuccess(true);
      } catch (error) {
        setPassword('');
        setRePassword('');
        setError(error);
      }
    };

    registerApiPost();
  };

  return (
    <div className="Register">
      {registerSuccess && <Redirect to={{ pathname: '/messages' }} />}
      <div className="HeadingRegister">Register</div>
      <div className="MainRegister">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="abc@example.com"
              value={email}
              onChange={handleChange(setEmail)}
              required
            />
          </div>
          <div>
            <label htmlFor="userName">Username</label>
            <input
              type="text"
              name="userName"
              id="userName"
              placeholder="abc_xyz"
              value={userName}
              onChange={handleChange(setUserName)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="password"
              value={password}
              onChange={handleChange(setPassword)}
              required
            />
          </div>
          <div>
            <label htmlFor="rePassword">Re-password</label>
            <input
              type="password"
              name="rePassword"
              id="rePassword"
              placeholder="re-password"
              value={rePassword}
              onChange={handleChange(setRePassword)}
              required
            />
          </div>
          {error && (
            <div className="ErrorRegister">
              <p>{error}</p>
            </div>
          )}
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
