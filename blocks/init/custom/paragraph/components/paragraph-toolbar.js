import React from 'react'; // eslint-disable-line no-unused-vars
import { ParagraphToolbar as ParagraphToolbarComponent } from '../../../components/paragraph/components/paragraph-toolbar';

export const ParagraphToolbar = (props) => {
  const {
    attributes: {
      styleAlign,
      removeStyle,
    },
    actions: {
      onChangeStyleAlign,
    },
  } = props;

  return (
    <ParagraphToolbarComponent
      styleAlign={styleAlign}
      onChangeStyleAlign={onChangeStyleAlign}
      removeStyle={removeStyle}
    />
  );
};
