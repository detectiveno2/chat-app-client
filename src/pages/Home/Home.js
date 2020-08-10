import React from 'react';
import { Link } from 'react-router-dom';

import './Home.css';

function Home() {
  return (
    <div className="Home">
      <div className="HomeWrapper">
        <div className="HomeLeft">
          <h1>ChApp</h1>
          <p>For group, for everyone, and for more...</p>
          <div className="DirectArea">
            <div className="AlignPaddingOne">
              <Link to="/auth/login">Login</Link>
            </div>
            <div
              style={{
                textAlign: 'center',
                padding: '0.5rem',
              }}
            >
              <span>Or</span>
            </div>
            <div className="AlignPaddingOne">
              <Link to="/auth/register">Register</Link>
            </div>
          </div>
        </div>
        <div className="HomeRight">
          <img alt="home" src="./conrerence-call.png" />
        </div>
      </div>
    </div>
  );
}

export default Home;
