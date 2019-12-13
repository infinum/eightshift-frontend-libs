import React from 'react'; // eslint-disable-line no-unused-vars
import { ButtonEditor as ButtonEditorComponent } from '../../../components/button/components/button-editor';

export const ButtonEditor = (props) => {
  const {
    attributes: {
      blockClass,
      title,
      styleSize,
      styleColor,
      styleSizeWidth,
    },
    actions: {
      onChangeTitle,
    },
  } = props;

  return (
    <ButtonEditorComponent
      blockClass={blockClass}
      title={title}
      onChangeTitle={onChangeTitle}
      styleSize={styleSize}
      styleColor={styleColor}
      styleSizeWidth={styleSizeWidth}
    />
  );
};
