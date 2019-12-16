import React from 'react'; // eslint-disable-line no-unused-vars
import { ParagraphToolbar as ParagraphToolbarComponent } from '../../../components/paragraph/components/paragraph-toolbar';

export const ParagraphToolbar = (props) => {
  const {
    attributes: {
      paragraph,
    },
    actions: {
      onChangeParagraphStyleAlign,
    },
  } = props;

  return (
    <ParagraphToolbarComponent
      paragraph={paragraph}
      onChangeStyleAlign={onChangeParagraphStyleAlign}
    />
  );
};
