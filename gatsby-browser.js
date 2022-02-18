import * as React from "react";
import { Auth0Provider } from '@auth0/auth0-react';
import { navigate } from 'gatsby';

const onRedirectCallback = (appState) => {
  // Use Gatsby's navigate method to replace the url
  navigate(appState?.returnTo || '/', { replace: true });
};

export const wrapRootElement = ({ element }) => (
  <Auth0Provider
    domain={process.env.AUTH0_DOMAIN}
    clientId={process.env.AUTH0_CLIENTID}
    redirectUri={process.env.AUTH0_CALLBACK}
    onRedirectCallback={onRedirectCallback}>
    {element}
  </Auth0Provider>
);