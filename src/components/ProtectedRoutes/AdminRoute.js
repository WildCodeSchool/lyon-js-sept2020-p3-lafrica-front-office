/* eslint-disable no-nested-ternary */
import React, { useContext } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import Home from '../home/Home';
import CampaignsView from '../campaignsView/ClassicCampaignsView';

const AdminRoute = ({ path, component: Component }) => {
  const { userDetails, loggedIn } = useContext(UserContext);

  return (
    <Route
      path={path}
      render={(props) =>
        loggedIn && userDetails.role === 'admin' ? (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <Component {...props} />
        ) : loggedIn ? (
          <CampaignsView />
        ) : (
          <Home />
        )
      }
    />
  );
};

export default withRouter(AdminRoute);
