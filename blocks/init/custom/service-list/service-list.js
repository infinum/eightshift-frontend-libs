import React from 'react'; // eslint-disable-line no-unused-vars
import { Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';
import { getActions } from 'EighshiftBlocksGetActions';
import manifest from './manifest.json';
import { ServiceListEditor } from './components/service-list-editor';
import { ImageOptions } from '../../components/image/components/image-options';

export const ServiceList = (props) => {

  const {
    attributes,
    attributes: {
      media,
    },
  } = props;

  const actions = getActions(props, manifest);

  return (
    <Fragment>
      <InspectorControls>
        <PanelBody title={__('Service List Details', 'eightshift-boilerplate')}>
          <ImageOptions
            media={media}
            onChangeMedia={actions.onChangeMedia}
          />
        </PanelBody>
      </InspectorControls>
      <ServiceListEditor
        attributes={attributes}
        actions={actions}
      />
    </Fragment>
  );
};
