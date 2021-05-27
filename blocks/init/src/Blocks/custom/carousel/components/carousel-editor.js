import React from 'react';
import classnames from 'classnames';
import { InnerBlocks } from '@wordpress/block-editor';
import { checkAttr } from '@eightshift/frontend-libs/scripts/helpers';
import manifest from '../manifest.json';

export const CarouselEditor = ({ attributes }) => {
	const {
		blockClass,
		blockJsClass,

		carouselAllowedBlocks = checkAttr('carouselAllowedBlocks', attributes, manifest),
		carouselIsLoop = checkAttr('carouselIsLoop', attributes, manifest),
		carouselShowItems = checkAttr('carouselShowItems', attributes, manifest),
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
