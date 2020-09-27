import React from 'react'; // eslint-disable-line no-unused-vars
import { Fragment } from '@wordpress/element';
import { BlockControls } from '@wordpress/block-editor';
import { getActions } from '@eightshift/frontend-libs/scripts/editor';
import manifest from './manifest.json';
import { ImageEditor } from './components/image-editor';
import { ImageToolbar } from './components/image-toolbar';

export const Image = (props) => {

	const {
		attributes,
	} = props;

	const actions = getActions(props, manifest);

	return (
		<Fragment>
			<BlockControls>
				<ImageToolbar
					attributes={attributes}
					actions={actions}
				/>
			</BlockControls>
			<ImageEditor
				attributes={attributes}
				actions={actions}
			/>
		</Fragment>
	);
};
