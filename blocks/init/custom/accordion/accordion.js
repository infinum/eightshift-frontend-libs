import React from 'react'; // eslint-disable-line no-unused-vars

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
