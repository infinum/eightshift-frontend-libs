import React from 'react'; // eslint-disable-line no-unused-vars
import { Fragment } from '@wordpress/element';
import { InspectorControls, BlockControls } from '@wordpress/block-editor';
import { getActions } from '@eightshift/frontend-libs/scripts/editor';
import manifest from './manifest.json';
import { CardListEditor } from './components/card-list-editor';
import { CardListOptions } from './components/card-list-options';
import { CardListToolbar } from './components/card-list-toolbar';

export const CardList = (props) => {

	const {
		attributes,
	} = props;

	const actions = getActions(props, manifest);

	return (
		<Fragment>
			<InspectorControls>
				<CardListOptions
					attributes={attributes}
					actions={actions}
				/>
			</InspectorControls>
			<BlockControls>
				<CardListToolbar
					attributes={attributes}
					actions={actions}
				/>
			</BlockControls>
			<CardListEditor
				attributes={attributes}
				actions={actions}
			/>
		</Fragment>
	);
};
