import React from 'react'; // eslint-disable-line no-unused-vars
import { Fragment } from '@wordpress/element';
import { InspectorControls, BlockControls } from '@wordpress/block-editor';
import { getActions } from '@eightshift/frontend-libs/scripts/editor';
import manifest from './manifest.json';
import { HeadingEditor } from './components/heading-editor';
import { HeadingOptions } from './components/heading-options';
import { HeadingToolbar } from './components/heading-toolbar';

export const Heading = (props) => {

	const {
		attributes,
	} = props;

	const actions = getActions(props, manifest);

	return (
		<Fragment>
			<InspectorControls>
				<HeadingOptions
					attributes={attributes}
					actions={actions}
				/>
			</InspectorControls>
			<BlockControls>
				<HeadingToolbar
					attributes={attributes}
					actions={actions}
				/>
			</BlockControls>
			<HeadingEditor
				attributes={attributes}
				actions={actions}
			/>
		</Fragment>
	);
};
