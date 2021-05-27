import React from 'react';
import classnames from 'classnames';
import { InnerBlocks } from '@wordpress/block-editor';

export const CarouselEditor = ({ attributes }) => {
	const {
		blockClass,
		blockJsClass,
		carouselAllowedBlocks,
		carouselIsLoop,
		carouselShowItems,
	} = attributes;

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
				allowedBlocks={carouselAllowedBlocks}
			/>
		</div>
	);
};
