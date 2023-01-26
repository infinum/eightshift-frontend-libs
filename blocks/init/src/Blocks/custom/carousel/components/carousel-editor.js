import React from 'react';
import classnames from 'classnames';
import { InnerBlocks } from '@wordpress/block-editor';
import { BlockInserter, checkAttr } from '@eightshift/frontend-libs/scripts';
import manifest from '../manifest.json';

export const CarouselEditor = ({ attributes, clientId }) => {
	const {
		blockClass,
		blockJsClass,
	} = attributes;

	const carouselAllowedBlocks = checkAttr('carouselAllowedBlocks', attributes, manifest);
	const carouselIsLoop = checkAttr('carouselIsLoop', attributes, manifest);
	const carouselShowItems = checkAttr('carouselShowItems', attributes, manifest);

	const carouselClass = classnames([
		blockClass,
		blockJsClass,
	]);

	return (
		<div
			className={carouselClass}
			data-show-items={carouselShowItems}
			data-is-loop={carouselIsLoop}
		>
			<InnerBlocks
				orientation='horizontal'
				allowedBlocks={carouselAllowedBlocks}
				renderAppender={() => <BlockInserter clientId={clientId} />}
			/>
		</div>
	);
};
