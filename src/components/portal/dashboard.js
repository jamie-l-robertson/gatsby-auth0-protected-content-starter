import React from "react";
import { Link } from "gatsby";
import Login from "../login";

const Dashboard = user => {
  const { nickname, email_verified, picture, email } = user;  
  const userGroup = user[`${process.env.AUTH0_NAMESPACE}/group`] || 'default';

  return (
    <>
      <h1>Dashboard</h1>
      <p>Welcome back, {nickname} - {email_verified && 'verified user' }</p> 

      <h2>Profile</h2>
      <img src={picture} style={{ width: '150px' }} alt={nickname} />
      <ul>
        <li>Email: {email}</li>
        <li>Group: {userGroup}</li>
      </ul>
      <Login />
      {userGroup === 'admin' && <Link to="/portal/admin">Admin area</Link>}
    </>
  )
};

export default Dashboard;

