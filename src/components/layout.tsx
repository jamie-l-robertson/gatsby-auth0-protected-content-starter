import React from "react"
import { useStaticQuery, graphql } from "gatsby";
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from "gatsby";
import Login from "../components/login";

interface ILayout {
  children: any,
  rest?: any
}

const Layout = ({ children, ...rest }:ILayout) => {
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

  const { isAuthenticated, user } = useAuth0();

  return (
    <div className="wrapper">
      <header>
        <h1>Hi {isAuthenticated ? user.name : "there"}</h1> 
        <Login />
      </header>
      <main id="main-content">{children}</main>
      <footer>
        <Link to="/portal">Portal</Link>
        <Link to="/portal/profile">Portal profile</Link>
      </footer>
    </div>
  )
}

export default Layout
