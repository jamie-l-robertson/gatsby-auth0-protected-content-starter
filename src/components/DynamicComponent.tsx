import React from "react";
import Page from '../contentTypes/page';
import ContentPanel from "../components/contentPanel";
import SbEditable from "storyblok-react";

interface IDynamicComponent {
  blok: {
    _uid: string,
    component: string
  }
}; 

const Components = {
  page: Page, 
  content_panel: ContentPanel
};

const DynamicComponent = ({ blok }:IDynamicComponent) => {
  if (typeof Components[blok.component] !== 'undefined') {
    const Component = Components[blok.component];

    return (
    <SbEditable content={blok}>
      <Component blok={blok} />
    </SbEditable>
    );
  }

  return (<p>The component <strong>{blok.component}</strong> has not been created yet.</p>);
}

export default DynamicComponent;
