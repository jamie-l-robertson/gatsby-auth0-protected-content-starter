import React from "react";
import RichTextRender from "@utils/richTextRender";
import { markdownToRichtext } from "storyblok-markdown-richtext";

const Content = ({ blok, type, ...rest }) => {
  // Check if we are using the markdown content panel or the default
  const rendered = type === 'content_panel_html' ? RichTextRender({ 
      content: markdownToRichtext(`${blok.content}`) 
    }) : RichTextRender(blok);

  return (
    <div {...rest}>
      {rendered && <>{rendered}</>}
    </div>
  );
};

export default Content;