import React from "react";
import { Router } from "@reach/router";
import { useAuth } from "react-use-auth";
import { navigate } from "gatsby";

import Layout from "@components/layout";
import PrivateRoute from "../components/privateRoute";
import Dashboard from "../components/portal/dashboard";
import PortalLanding from "../components/portal/portal";
import Admin from "../components/portal/admin";

const Portal = () => {
  const { isAuthenticated, user } = useAuth();

  if((!isAuthenticated()) && (typeof window !== "undefined")) navigate('/');

  const isAdmin = user[`${process.env.AUTH0_NAMESPACE}/permissions`];

  return(
    <Layout>
      <Router basepath="/">
        <PrivateRoute path="/portal/profile" component={Dashboard} {...user} />
        <PrivateRoute path="/portal/admin" component={Admin} isAdmin={isAdmin} />
        <PrivateRoute path="/portal" component={PortalLanding} {...user} />
      </Router>
    </Layout>
  )
}

export default Portal;
