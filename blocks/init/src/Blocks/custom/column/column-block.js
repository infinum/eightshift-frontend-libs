/* eslint-disable no-unused-vars, import/no-extraneous-dependencies */

import React from 'react';
import { Fragment } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';
import { getActions } from '@eightshift/frontend-libs/scripts/editor';
import manifest from './manifest.json';
import { ColumnEditor } from './components/column-editor';
import { ColumnOptions } from './components/column-options';

export const Column = (props) => {
	const {
		attributes,
	} = props;

	const actions = getActions(props, manifest);

	return (
		<Fragment>
			<InspectorControls>
				<ColumnOptions
					attributes={attributes}
					actions={actions}
				/>
			</InspectorControls>
			<ColumnEditor
				attributes={attributes}
				actions={actions}
			/>
		</Fragment>
	);
};
