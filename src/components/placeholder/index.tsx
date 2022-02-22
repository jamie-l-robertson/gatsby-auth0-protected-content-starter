import React from 'react';

interface IPlaceholder { 
  componentName: string 
};

const Placeholder = ({ componentName }:IPlaceholder) => (
  <p>The component <strong>{componentName}</strong> has not been created yet.</p>
);

export default Placeholder;
