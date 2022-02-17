import React from "react"
import { useStaticQuery, graphql } from "gatsby";
import { useAuth } from "react-use-auth";
import { Link } from "gatsby";

import Login from "@components/login";

const Layout = ({ children, ...rest }) => {
  // const { settings } = useStaticQuery(graphql`
  //   query Settings {
  //     settings: allStoryblokEntry(filter: { field_component: { eq: "settings" } }) {
  //       edges {
  //         node {
  //           name
  //           full_slug
  //           content
  //         }
  //       }
  //     }
  //   }
  // `)

  const { isAuthenticated, user } = useAuth();

  return (
    <div className="wrapper">
      HEADER
      <h1>Hi {isAuthenticated() ? user.name : "there"}</h1> 
      <Login />
      <main id="main-content">{children}</main>
      FOOTER
      <Link to="/portal">Portal</Link>
      <Link to="/portal/profile">Portal profile</Link>
    </div>
  )
}

export default Layout
