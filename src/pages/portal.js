import React from "react";
import { Router } from "@reach/router";
import { useAuth0 } from '@auth0/auth0-react';
import { navigate } from "gatsby";

import Layout from "@components/layout";
import PrivateRoute from "../components/privateRoute";
import Dashboard from "../components/portal/dashboard";
import PortalLanding from "../components/portal/portal";
import Admin from "../components/portal/admin";

const Portal = () => {
  const { isAuthenticated, user } = useAuth0();

  if((!isAuthenticated) && (typeof window !== "undefined")) navigate('/');

  const user_access = user[`${process.env.AUTH0_PORTAL_ACCESS}`];

  return(
    <Layout>
      <Router basepath="/">
        <PrivateRoute path="/portal/profile" component={Dashboard} {...user} />
        <PrivateRoute path="/portal/admin" component={Admin} access={user_access} />
        <PrivateRoute path="/portal" component={PortalLanding} {...user} />
      </Router>
    </Layout>
  )
}

export default Portal;
