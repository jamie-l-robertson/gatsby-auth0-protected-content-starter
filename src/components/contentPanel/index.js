import React from "react";
import SbEditable from 'storyblok-react';
import Content from '@components/content';

const ContentPanel = ({ blok }) => {
  return (
    <SbEditable content={blok}>
      <h1>{blok.title}</h1>
      <Content blok={blok} />
      {blok.link && blok.link?.url && <a href={blok.link.url}>Click here</a>}
    </SbEditable>
  );
}

export default ContentPanel;