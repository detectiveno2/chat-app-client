import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';

import authApi from '../api/authApi';

function PublicRoute({ component: Component, ...rest }) {
  // Check auth.
  const [auth, setAuth] = useState(false);
  useEffect(() => {
    const checkAuth = async () => {
      try {
        await authApi.get();
        setAuth(true);
      } catch (error) {
        setAuth(false);
      }
    };

    checkAuth();
  }, []);

  // Return route if user is unauth.
  if (!auth) {
    return (
      <Route
        {...rest}
        render={(props) => {
          return <Component {...props} />;
        }}
      />
    );
  }

  // Redirect  if user is auth.
  return <Redirect to={{ pathname: '/messages' }} />;
}

export default PublicRoute;
