import React from "react";
import { Link, graphql } from "gatsby";
import useStoryblok from "@utils/storyblok";
import { sbEditable } from "@storyblok/storyblok-editable";
import DynamicComponent from '@components/DynamicComponent';

import Layout from "@components/layout";

const IndexPage = ({ data, location }) => {

  const story = useStoryblok(data.storyblokEntry, location);

  return (
    <Layout>
      <div {...sbEditable(story.content)}>
        {story?.content?.body.map( blok => {
          return <DynamicComponent blok={blok} key={blok._uid} />
        })}
      </div>
      <Link to="/portal">Portal</Link>
      <Link to="/portal/profile">Portal profile</Link>
    </Layout>
  )
};

export default IndexPage;

export const query = graphql`
  query HomeQuery {
    storyblokEntry(full_slug: {eq: "home"}) {
      name
      content
      full_slug
      uuid
    }
  }`;