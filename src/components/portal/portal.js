import React from "react";

const PortalLanding = user => {
  const { nickname } = user;  
  const userGroup = user[`${process.env.AUTH0_NAMESPACE}/group`] || 'default';

  return (
    <>
      <h1>Welcome {nickname}</h1>
      <p>To your personalized portal for group <b>{userGroup}</b>.</p>
    </>
  )
};

export default PortalLanding;