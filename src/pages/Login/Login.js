import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import authApi from '../../api/authApi';

import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleChange = (set) => (event) => set(event.target.value.trim());
  const handleSubmit = (event) => {
    event.preventDefault();

    const loginApiPost = async () => {
      try {
        const data = { email, password };
        const { token } = await authApi.postLogin(data);
        const storageKey = 'jwtToken';
        const jwtToken = `Bearer ${token}`;

        localStorage.setItem(storageKey, jwtToken);
        setLoginSuccess(true);
      } catch (error) {
        setPassword('');
        setError(error);
      }
    };

    loginApiPost();
  };

  return (
    <div className="Login">
      {loginSuccess && <Redirect to={{ pathname: '/messages' }} />}
      <div className="HeadingLogin">Login</div>
      <div className="MainLogin">
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
          {error && (
            <div className="ErrorRegister">
              <p>{error}</p>
            </div>
          )}
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
