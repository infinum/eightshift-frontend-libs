/* eslint-disable no-unused-vars, import/no-extraneous-dependencies */
import React from 'react';
import { Fragment } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';
import { ColumnEditor } from './components/column-editor';
import { ColumnOptions } from './components/column-options';

export const Column = (props) => {
	return (
		<Fragment>
			<InspectorControls>
				<ColumnOptions {...props} />
			</InspectorControls>
			<ColumnEditor {...props} />
		</Fragment>
	);
};
