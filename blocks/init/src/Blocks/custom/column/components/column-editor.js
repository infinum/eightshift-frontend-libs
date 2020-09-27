/* eslint-disable no-unused-vars, import/no-extraneous-dependencies */

import React from 'react';
import { InnerBlocks } from '@wordpress/block-editor';

export const ColumnEditor = ({ attributes }) => {
	const {
		allowedBlocks,
	} = attributes;

	return (
		<InnerBlocks
			allowedBlocks={(typeof allowedBlocks === 'undefined') || allowedBlocks}
		/>
	);
};
