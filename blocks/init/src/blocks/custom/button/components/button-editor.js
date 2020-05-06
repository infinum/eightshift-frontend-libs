import React from 'react'; // eslint-disable-line no-unused-vars
import { ButtonEditor as ButtonEditorComponent } from '../../../components/button/components/button-editor';

export const ButtonEditor = ({ attributes }) => {
  const {
    blockClass,
    button,
  } = attributes;

  const buttonObject = (typeof button === 'undefined') || button;

  return (
    <ButtonEditorComponent
      blockClass={blockClass}
      button={buttonObject}
    />
  );
};
