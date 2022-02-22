import * as React from "react";
import RichTextRender from "../../utils/richTextRender";
import { markdownToRichtext } from "storyblok-markdown-richtext";

interface IContent {
  blok: {
    content: object
  },
  type?: string,
  rest?: any
};

const Content = ({ blok, type, ...rest }: IContent) => {
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