import React from "react";
import { withAuthenticationRequired } from '@auth0/auth0-react';

interface IPrivateRoute {
  component: any,
  location?: string,
  path?: string
  access?: string
};

const PrivateRoute = ({ component: Component, location, ...rest }:IPrivateRoute) => <Component {...rest} />;

export default withAuthenticationRequired(PrivateRoute, {
  // Show a message while the user waits to be redirected to the login page.
  onRedirecting: () => <div>Redirecting you to the login page...</div>,
});
