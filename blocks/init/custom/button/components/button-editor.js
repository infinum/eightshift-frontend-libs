import React from 'react'; // eslint-disable-line no-unused-vars
import { ButtonEditor as ButtonEditorComponent } from '../../../components/button/components/button-editor';

export const ButtonEditor = (props) => {
  const {
    attributes: {
      blockClass,
      button,
    },
  } = props;

  return (
    <ButtonEditorComponent
      blockClass={blockClass}
      button={button}
    />
  );
};
