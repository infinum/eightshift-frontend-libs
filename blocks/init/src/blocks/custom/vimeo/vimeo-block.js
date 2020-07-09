import { Fragment } from '@wordpress/element';
import { InspectorControls } from '@wordpress/editor';
import { getActions } from '@eightshift/frontend-libs/scripts/editor';
import manifest from './manifest.json';
import { VimeoEditor } from './components/vimeo-editor';
import { VimeoOptions } from './components/vimeo-options';

export const Vimeo = (props) => {
  const {
    attributes,
  } = props;

  const actions = getActions(props, manifest);

  return (
    <Fragment>
      <InspectorControls>
        <VimeoOptions
          attributes={attributes}
          actions={actions}
        />
      </InspectorControls>
      <VimeoEditor
        attributes={attributes}
      />
    </Fragment>
  );
};
