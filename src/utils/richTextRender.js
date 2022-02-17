import React from 'react';
import { render } from 'storyblok-rich-text-react-renderer';

const RichTextRender = props => {

  if (!props) return false;

  const copy = props.content || props.copy || props.text;

  // Add components you want to render inside a WYSIWYG here
  const content = render(copy, {
    markResolvers: {},
    blokResolvers: {}
  });

  return content;
}

export default RichTextRender;
