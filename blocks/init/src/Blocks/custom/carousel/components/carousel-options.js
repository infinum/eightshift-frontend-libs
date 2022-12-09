import React from 'react';
import { __ } from '@wordpress/i18n';
import { PanelBody, BaseControl, __experimentalNumberControl as ExperimentalNumberControl, NumberControl as StableNumberControl } from '@wordpress/components';
import { icons, checkAttr, getAttrKey, IconLabel, IconToggle, getOption, FancyDivider } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';

export const CarouselOptions = ({ attributes, setAttributes }) => {
	const carouselIsLoop = checkAttr('carouselIsLoop', attributes, manifest);
	const carouselShowItems = checkAttr('carouselShowItems', attributes, manifest);
	const carouselShowPrevNext = checkAttr('carouselShowPrevNext', attributes, manifest);
	const carouselShowPagination = checkAttr('carouselShowPagination', attributes, manifest);

	const NumberControl = ExperimentalNumberControl ?? StableNumberControl;

	return (
		<PanelBody title={__('Carousel', 'eightshift-frontend-libs')}>
			<BaseControl
				label={<IconLabel icon={icons.itemLimit} label={__('Slides on screen', 'eightshift-frontend-libs')} standalone />}
				className='es-inline-input-label-24'
				help={carouselShowItems === -1 ? __('Works best when items are all same size', 'eightshift-frontend-libs') : ''}
			>
				<div className='es-h-end'>
					{carouselShowItems !== -1 &&
						<NumberControl
							{...getOption('carouselItemsToShow', attributes, manifest)}
							value={carouselShowItems}
							onChange={(value) => setAttributes({ [getAttrKey('carouselShowItems', attributes, manifest)]: value })}
							isDragEnabled
							className='es-w-12 es-flex-shrink-0'

						/>
					}

					<IconToggle
						icon={icons.automatic}
						label={__('Automatic', 'eightshift-frontend-libs')}
						checked={carouselShowItems === -1}
						onChange={(value) => setAttributes({ [getAttrKey('carouselShowItems', attributes, manifest)]: value ? -1 : 1 })}
						type='iconButton'
					/>
				</div>
			</BaseControl>

			<FancyDivider label={<IconLabel icon={icons.options} label={__('Behavior & controls', 'eightshift-frontend-libs')} />} additionalClasses='es-mb-2' />

			<div className='es-h-spaced'>
				<IconToggle
					icon={icons.loopMode}
					label={__('Loop', 'eightshift-frontend-libs')}
					checked={carouselIsLoop}
					onChange={(value) => setAttributes({ [getAttrKey('carouselIsLoop', attributes, manifest)]: value })}
					type='tileButton'
				/>

				<IconToggle
					icon={icons.navigationButtons}
					label={__('Navigation', 'eightshift-frontend-libs')}
					checked={carouselShowPrevNext}
					onChange={(value) => setAttributes({ [getAttrKey('carouselShowPrevNext', attributes, manifest)]: value })}
					type='tileButton'
				/>

				<IconToggle
					icon={icons.pagination}
					label={__('Pagination', 'eightshift-frontend-libs')}
					checked={carouselShowPagination}
					onChange={(value) => setAttributes({ [getAttrKey('carouselShowPagination', attributes, manifest)]: value })}
					type='tileButton'
				/>
			</div>
		</PanelBody>
	);
};
