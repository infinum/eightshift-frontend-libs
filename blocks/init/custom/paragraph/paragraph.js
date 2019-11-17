import React from 'react';
import { Fragment } from '@wordpress/element';
import { InspectorControls, BlockControls } from '@wordpress/editor';

import { getActions } from 'EighshiftBlocksGetActions';
import manifest from './manifest.json';

import { ParagraphEditor } from '../../components/paragraph/components/paragraph-editor';
import { ParagraphOptions } from '../../components/paragraph/components/paragraph-options';
import { ParagraphToolbar } from '../../components/paragraph/components/paragraph-toolbar';

export const Paragraph = (props) => {
  const {
    attributes: {
      blockClass,
      content,
      styleAlign,
      styleColor,
      styleSize,
      removeStyle,
    },
  } = props;

  const actions = getActions(props, manifest);

  return (
    <Fragment>
      <InspectorControls>
        <ParagraphOptions
          styleAlign={styleAlign}
          onChangeStyleAlign={actions.onChangeStyleAlign}
          styleColor={styleColor}
          onChangeStyleColor={actions.onChangeStyleColor}
          removeStyle={removeStyle}
        />
      </InspectorControls>
      <BlockControls>
        <ParagraphToolbar
          styleAlign={styleAlign}
          onChangeStyleAlign={actions.onChangeStyleAlign}
          removeStyle={removeStyle}
        />
      </BlockControls>
      <ParagraphEditor
        blockClass={blockClass}
        content={content}
        onChangeContent={actions.onChangeContent}
        styleAlign={styleAlign}
        styleColor={styleColor}
        styleSize={styleSize}
        removeStyle={removeStyle}
      />
    </Fragment>
  );
};
