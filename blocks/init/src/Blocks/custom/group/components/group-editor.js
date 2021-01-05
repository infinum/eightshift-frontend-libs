import React from 'react';
import { InnerBlocks } from '@wordpress/block-editor';

export const GroupEditor = ({ attributes }) => {
	const {
		blockClass,
	} = attributes;

	return (
		<div className={blockClass}>
			<InnerBlocks />
		</div>
	);
};
