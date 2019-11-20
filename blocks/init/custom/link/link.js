import React from 'react';
import { Fragment } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';

import { getActions } from 'EighshiftBlocksGetActions';
import manifest from './manifest.json';

import { LinkEditor } from '../../components/link/components/link-editor';
import { LinkOptions } from '../../components/link/components/link-options';

export const Link = (props) => {
  const {
    attributes: {
      blockClass,
      title,
      url,
      styleColor,
      isAnchor,
    },
  } = props;

  const actions = getActions(props, manifest);

  return (
    <Fragment>
      <InspectorControls>
        <LinkOptions
          url={url}
          onChangeUrl={actions.onChangeUrl}
          styleColor={styleColor}
          onChangeStyleColor={actions.onChangeStyleColor}
          isAnchor={isAnchor}
          onChangeIsAnchor={actions.onChangeIsAnchor}
        />
      </InspectorControls>
      <LinkEditor
        blockClass={blockClass}
        title={title}
        onChangeTitle={actions.onChangeTitle}
        styleColor={styleColor}
        isAnchor={isAnchor}
      />
    </Fragment>
  );
};
