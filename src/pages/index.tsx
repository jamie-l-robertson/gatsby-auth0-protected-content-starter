import React from "react";
import { graphql } from "gatsby";
import useStoryblok from "../utils/storyblok";
import SbEditable from 'storyblok-react';
import DynamicComponent from '../components/DynamicComponent';
import Layout from "../components/layout";
import { Helmet } from "react-helmet";

interface IPage {
  data: any,
  location: string
}

const IndexPage = ({ data, location }:IPage) => {
  const story = useStoryblok(data.storyblokEntry, location);

  console.log(story.name);

  return (
    <Layout>
      <Helmet htmlAttributes={{ lang: 'en' }}>
        <title>{story.name}</title>
      </Helmet>
      <SbEditable content={story.content}>
        {story?.content?.body.map( blok => <DynamicComponent blok={blok} key={blok._uid} />)}
      </SbEditable>
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
  }
`;