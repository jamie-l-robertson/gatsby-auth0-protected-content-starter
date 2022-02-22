import React from "react";
import { Link } from "gatsby";
import Login from "../login";

interface IUser {
  nickname: string,
  email_verified: boolean,
  picture: string,
  email: string
};

const Dashboard = (user:IUser) => {

const { nickname, email_verified, picture, email } = user;  
const userGroup = user[`${process.env.AUTH0_NAMESPACE}/group`] || '';
const permissions = user[`${process.env.AUTH0_PORTAL_ACCESS}`] || false;

  return (
    <>
      <h1>Dashboard</h1>
      <p>{email_verified && 'verified user' }</p> 

      <h2>Profile</h2>
      <img src={picture} style={{ width: '150px' }} alt={nickname} />
      <ul>
        <li>Email: {email}</li>
        <li>Group: {userGroup}</li>
      </ul>
      <Login />
      {permissions && <Link to="/portal/admin">Admin area</Link>}
    </>
  )
};

export default Dashboard;

