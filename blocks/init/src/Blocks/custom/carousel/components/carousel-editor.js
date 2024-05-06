import React from 'react';
import { AnimatedContentVisibility, BlockInserter, checkAttr, classnames, IconLabel, icons } from '@eightshift/frontend-libs/scripts';
import { __ } from '@wordpress/i18n';
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import manifest from '../manifest.json';

export const CarouselEditor = ({ attributes, clientId }) => {
	const { blockClass } = attributes;

	const carouselAllowedBlocks = checkAttr('carouselAllowedBlocks', attributes, manifest);
	const carouselIsLoop = checkAttr('carouselIsLoop', attributes, manifest);
	const carouselShowPrevNext = checkAttr('carouselShowPrevNext', attributes, manifest);
	const carouselShowPagination = checkAttr('carouselShowPagination', attributes, manifest);

	const carouselClass = classnames(blockClass, 'es-position-relative es-no-h-inner-blocks-gutenberg-margin');

	const blockProps = useBlockProps();
	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		allowedBlocks: carouselAllowedBlocks,
		renderAppender: () => <BlockInserter clientId={clientId} />,
		orientation: 'horizontal',
	});

	return (
		<div className={carouselClass}>
			<div {...innerBlocksProps} />

			<AnimatedContentVisibility showIf={carouselIsLoop} additionalContainerClasses='es-position-absolute es-top-4 es-left-4 es-pointer-events-none'>
				<IconLabel
					icon={icons.loopMode}
					label={__('Loop', '%g_textdomain%')}
					additionalClasses='es-bg-pure-white es-p-2 es-rounded-2'
					standalone
				/>
			</AnimatedContentVisibility>

			<AnimatedContentVisibility showIf={carouselShowPagination} additionalContainerClasses='es-h-spaced es-content-center -es-mt-4 es-mb-2'>
				<div className='es-w-2 es-h-2 es-border-pure-black es-rounded-full es-bg-pure-black' />
				<div className='es-w-2 es-h-2 es-border-pure-black es-rounded-full' />
				<div className='es-w-2 es-h-2 es-border-pure-black es-rounded-full' />
				<div className='es-w-2 es-h-2 es-border-pure-black es-rounded-full' />
			</AnimatedContentVisibility>

			<AnimatedContentVisibility showIf={carouselShowPrevNext} additionalContainerClasses='es-h-spaced es-content-center es-mt-4 es-mb-2'>
				<i
					className='es-h-12 es-w-12 es-display-flex es-items-center es-content-center es-rounded-full es-border-pure-black'
					dangerouslySetInnerHTML={{ __html: manifest.resources.prevIcon }}
				/>
				<i
					className='es-h-12 es-w-12 es-display-flex es-items-center es-content-center es-rounded-full es-border-pure-black'
					dangerouslySetInnerHTML={{ __html: manifest.resources.nextIcon }}
				/>
			</AnimatedContentVisibility>
		</div>
	);
};
