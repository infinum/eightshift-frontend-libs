import React from 'react'; // eslint-disable-line no-unused-vars
import { Fragment } from '@wordpress/element';
import { BlockControls } from '@wordpress/block-editor';
import { getActions } from '@eightshift/frontend-libs/scripts/editor';
import manifest from './manifest.json';
import { CardEditor } from './components/card-editor';
import { CardToolbar } from './components/card-toolbar';

export const Card = (props) => {

	const {
		attributes,
	} = props;

	const actions = getActions(props, manifest);

	return (
		<Fragment>
			<BlockControls>
				<CardToolbar
					attributes={attributes}
					actions={actions}
				/>
			</BlockControls>
			<CardEditor
				attributes={attributes}
				actions={actions}
			/>
		</Fragment>
	);
};
