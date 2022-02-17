import React from "react";
import { useStaticQuery, graphql } from "gatsby";

const Layout = ({ children }) => {
  // const data = useStaticQuery(graphql`
  //   query SiteTitleQuery {
  //     site {
  //       siteMetadata {
  //         title
  //       }
  //     }
  //   }
  // `)

  return (
    <>  
       <main>{children}</main>
    </>
  )
}

export default Layout;
