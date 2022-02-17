import React from "react";
import { Link } from "gatsby";
import { useAuth } from "react-use-auth";

import Login from "../components/login";
const IndexPage = () => {
  const { isAuthenticated, user } = useAuth();
  
  return (
    <>
      <h1>Hi {isAuthenticated() ? user.name : "there"}</h1>
      <Login />
      <Link to="/portal">Portal</Link>
      <Link to="/portal/profile">Portal profile</Link>
    </>
  )
};

export default IndexPage;