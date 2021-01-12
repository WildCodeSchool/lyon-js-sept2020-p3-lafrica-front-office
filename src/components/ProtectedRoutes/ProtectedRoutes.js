import React, { useContext } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import Home from '../home/Home';

const ProtectedRoute = ({ path, component: Component }) => {
  const { loggedIn } = useContext(UserContext);

  return (
    <Route
      path={path}
      render={(props) =>
        // eslint-disable-next-line react/jsx-props-no-spreading
        loggedIn ? <Component {...props} /> : <Home />
      }
    />
  );
};

export default withRouter(ProtectedRoute);
