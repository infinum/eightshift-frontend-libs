import React from 'react';

import { AccordionEditor } from './components/accordion-editor';

export const Accordion = (props) => {
  const {
    attributes,
  } = props;

  return (
    <AccordionEditor
      attributes={attributes}
    />
  );
};
