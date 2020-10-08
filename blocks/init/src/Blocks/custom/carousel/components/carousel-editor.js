import React from 'react'; // eslint-disable-line no-unused-vars
import classnames from 'classnames';
import { InnerBlocks } from '@wordpress/block-editor';
import { CarouselNavigationEditor } from './../../../components/carousel-navigation/components/carousel-navigation-editor';

export const CarouselEditor = ({ attributes }) => {
	const {
		blockClass,
		blockJsClass,
		allowedBlocks,
	} = attributes;

	const blocksObject = (typeof allowedBlocks === 'undefined') || allowedBlocks;

	return (
		<div className={classnames(blockClass, blockJsClass)}>
			<InnerBlocks
				allowedBlocks={blocksObject}
			/>
			<div className={`${blockClass}__navigation`}>
				<CarouselNavigationEditor />
			</div>
		</div>
	);
};
