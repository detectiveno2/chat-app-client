import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';

import authApi from '../api/authApi';

function PrivateRoute({ component: Component, ...rest }) {
  // Check auth.
  const [auth, setAuth] = useState(true);
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

  // Redirect if user is unauth.
  if (!auth) {
    return <Redirect to={{ pathname: '/auth/login' }} />;
  }

  // Return route if user is auth.
  return (
    <Route
      {...rest}
      render={(props) => {
        return <Component {...props} />;
      }}
    />
  );
}

export default PrivateRoute;
