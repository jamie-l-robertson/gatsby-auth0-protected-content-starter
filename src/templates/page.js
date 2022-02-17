import * as React from "react";
import DynamicComponent from "../components/dynamicComponent";

import useStoryblok from "../utils/storyblok";

const Page = ({ pageContext, location }) => { 
  let story = pageContext.story;

  story = useStoryblok(story, location);

  return (
  <>
    <h1>{ story.name }</h1>
  </>
)}

export default Page;