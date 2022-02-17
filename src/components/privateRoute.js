import React from "react";
import { navigate } from "gatsby";
import { useAuth } from "react-use-auth";

const PrivateRoute = ({ component: Component, location, accessGroup, ...rest }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated() || accessGroup && accessGroup !== 'admin') {
    
    if(typeof window !== "undefined") {
      navigate("/");
      return null;
    }
  }
  
  return <Component {...rest} />
}

export default PrivateRoute;
