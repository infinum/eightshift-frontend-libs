import React from 'react';
import { Fragment } from '@wordpress/element';
import { InspectorControls, BlockControls } from '@wordpress/editor';

import { getActions } from 'EighshiftBlocksGetActions';
import manifest from './manifest.json';

import { HeadingEditor } from '../../components/heading/components/heading-editor';
import { HeadingOptions } from '../../components/heading/components/heading-options';
import { HeadingToolbar } from '../../components/heading/components/heading-toolbar';

export const Heading = (props) => {
  const {
    attributes: {
      blockClass,
      content,
      level,
      styleAlign,
      styleColor,
      styleSize,
    },
  } = props;

  const actions = getActions(props, manifest);

  return (
    <Fragment>
      <InspectorControls>
        <HeadingOptions
          styleColor={styleColor}
          onChangeStyleColor={actions.onChangeStyleColor}
          styleSize={styleSize}
          onChangeStyleSize={actions.onChangeStyleSize}
        />
      </InspectorControls>
      <BlockControls>
        <HeadingToolbar
          level={level}
          onChangeLevel={actions.onChangeLevel}
          styleAlign={styleAlign}
          onChangeStyleAlign={actions.onChangeStyleAlign}
        />
      </BlockControls>
      <HeadingEditor
        blockClass={blockClass}
        content={content}
        onChangeContent={actions.onChangeContent}
        level={level}
        styleAlign={styleAlign}
        styleColor={styleColor}
        styleSize={styleSize}
      />
    </Fragment>
  );
};
