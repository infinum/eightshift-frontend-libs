import React from 'react';
import { InnerBlocks } from '@wordpress/block-editor';
import { BlockInserter } from '@eightshift/frontend-libs/scripts';

export const GroupEditor = ({ attributes, clientId }) => {
	const {
		blockClass,
	} = attributes;

	return (
		<div className={blockClass}>
			<InnerBlocks renderAppender={() => <BlockInserter clientId={clientId} additionalClasses='es-mb-6' />} />
		</div>
	);
};
