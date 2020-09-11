import React from 'react'; // eslint-disable-line no-unused-vars
import { ParagraphToolbar as ParagraphToolbarComponent } from '../../../Components/paragraph/components/paragraph-toolbar';

export const ParagraphToolbar = ({ attributes, actions }) => {
  const {
    paragraph,
  } = attributes;

  const {
    onChangeParagraphStyleAlign,
  } = actions;

  const paragraphObject = (typeof paragraph === 'undefined') || paragraph;

  return (
    <ParagraphToolbarComponent
      paragraph={paragraphObject}
      onChangeStyleAlign={onChangeParagraphStyleAlign}
    />
  );
};
