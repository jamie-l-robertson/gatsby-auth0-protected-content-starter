import React from "react";
import { Router } from "@reach/router";
import { useAuth } from "react-use-auth";
import { navigate } from "gatsby";


import PrivateRoute from "../components/privateRoute";
import Dashboard from "../components/portal/dashboard";
import PortalLanding from "../components/portal/portal";
import Admin from "../components/portal/admin";

const Portal = () => {
  const { isAuthenticated, user } = useAuth();

  if(!isAuthenticated()) navigate('/');

  const userGroup = user[`${process.env.AUTH0_NAMESPACE}/group`];

  return(
    <Router basepath="/">
      <PrivateRoute path="/portal/profile" component={Dashboard} {...user} />
      <PrivateRoute path="/portal" component={PortalLanding} {...user} />
      <PrivateRoute path="/portal/admin" component={Admin} accessGroup={userGroup} />
    </Router>
  )
}

export default Portal;
