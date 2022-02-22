import React from "react";
import { useAuth0 } from '@auth0/auth0-react';

const Admin = () => {
const { user } = useAuth0();
const permissions = user[`${process.env.AUTH0_PORTAL_ACCESS}`] || false;

if(!permissions.includes('admin')) return <h1>Access denied!</h1>

  return (
    <>
      <p>{user.nickname}'s admin area...</p>
      <p>@TODO: add list of users(name, email, group) with group update and remove user options. probably a search and pagination too!</p>
    </>
  )
}

export default Admin;