import { Fragment } from '@wordpress/element';
import { InspectorControls } from '@wordpress/editor';

import { getActions } from 'EighshiftBlocksGetActions';
import manifest from './manifest.json';

import { WrapperEditor } from './components/wrapper-editor';
import { WrapperOptions } from './components/wrapper-options';

export const Wrapper = (props) => {
  const {
    props: {
      attributes,
      attributes: {
        hasWrapper,
      },
    },
    children,
  } = props;

  const actions = getActions(props.props, manifest);

  return (
    <Fragment>
      {hasWrapper ?
        <Fragment>
          <InspectorControls> 
            <WrapperOptions
              attributes={attributes}
              actions={actions}
            />
          </InspectorControls>

          <WrapperEditor
            children={children}
            attributes={attributes}
          />
        </Fragment> :
        <Fragment>
          {children}
        </Fragment>
      }
    </Fragment>
  );
};
