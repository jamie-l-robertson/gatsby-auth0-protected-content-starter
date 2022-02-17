import React from 'react';
import DynamicComponent from '@components/DynamicComponent';

// Page type defined in Storyblok
// Body is of field type "blocks"
const Page = ({ blok }) => {
  return (
    <>
      {blok.body && blok.body.map((blok, index, arr) => {
        blok.prevBg = index > 0 ? arr[index - 1].background : null;

        return (
          <DynamicComponent blok={blok} key={blok._uid} />
        );
      })}
    </>
  );
};

export default Page;