import React from 'react';
import { Link } from 'react-router-dom';

import './Header.css';

function Header(props) {
  const logout = () => {
    const storageKey = 'jwtToken';
    localStorage.removeItem(storageKey);
  };

  return (
    <div className="Header">
      <div className="BigLogoWrapper">
        <p>ChApp</p>
      </div>
      <div className="ActionAreaWrapper">
        <div className="ActionArea">
          <Link to="#">
            <img src={props.avatarUrl} alt="avatar" />
          </Link>
          <Link to="/auth/login">
            <button type="submit" onClick={logout}>
              Logout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
