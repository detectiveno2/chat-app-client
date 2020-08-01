import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import { PublicRoute, PrivateRoute } from './routes';
import { Home, Login, Register, Messages } from './pages';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <PublicRoute exact path="/" component={() => <Home />} />
          <PublicRoute path="/auth/login" component={() => <Login />} />
          <PublicRoute path="/auth/register" component={() => <Register />} />
          <PrivateRoute path="/messages" component={() => <Messages />} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
