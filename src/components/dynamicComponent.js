import React from "react";
import { sbEditable } from "@storyblok/storyblok-editable";

import Page from '@contentTypes/page';
import ContentPanel from "@components/contentPanel";

const Components = {
  page: Page, 
  content_panel: ContentPanel
};

const DynamicComponent = ({ blok }) => {
  if (typeof Components[blok.component] !== 'undefined') {
    const Component = Components[blok.component];

    return (<div {...sbEditable(blok)} content={blok}><Component blok={blok} /></div>);
  }

  return (<p>The component <strong>{blok.component}</strong> has not been created yet.</p>);
}

export default DynamicComponent;
