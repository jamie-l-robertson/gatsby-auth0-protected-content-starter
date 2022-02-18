import React from "react";
import { gql, useQuery } from '@apollo/client';
import DynamicComponent from "@components/DynamicComponent";

const PORTAL_LANDING_QUERY = gql`
 query Portal($userGroup: String!) {
  PageItems(starts_with: $userGroup, is_startpage: "true") {
    items {
      content {
        _editable
        _uid
        body
        component
      }
      is_startpage
    }
  }
}
`;

const PortalLanding = (user = {}) => {
const userAccess = user[`${process.env.AUTH0_PORTAL_ACCESS}`] || '';
const userGroup = userAccess.filter(e => e !== 'admin');

const { data, loading, error } = useQuery(PORTAL_LANDING_QUERY, { variables: { userGroup: `portal/${userGroup}` }});

if (loading) return 'Loading...';

if (error) return 'Oops!';

const { content } = data.PageItems?.items[0] || [];

  return (
    <>
       {content?.body.map( blok => {
          return <DynamicComponent blok={blok} key={blok._uid} />
        })}
    </>
  )
};

export default PortalLanding;