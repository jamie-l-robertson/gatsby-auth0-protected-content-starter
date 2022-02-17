import React from "react";
import { useAuth } from "react-use-auth";

 const Admin = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <>
      <p>{user.nickname}'s admin area...</p>
      <p>@TODO: add list of users(name, email, group) with group update and remove user options. probably a search and pagination too!</p>
    </>
  )
}

export default Admin;