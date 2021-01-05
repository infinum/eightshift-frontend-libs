import React from 'react';
import classnames from 'classnames';
import { InnerBlocks } from '@wordpress/block-editor';

export const CarouselEditor = ({ attributes }) => {
	const {
		blockClass,
		blockJsClass,
		allowedBlocks,
		showItems,
	} = attributes;

	const carouselClass = classnames([
		blockClass,
		blockJsClass,
	]);

	return (
		<div className={carouselClass} data-show-items={showItems}>
			<InnerBlocks
				allowedBlocks={allowedBlocks}
			/>
		</div>
	);
};
