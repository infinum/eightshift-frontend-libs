import React from 'react';
import { __ } from '@wordpress/i18n';
import { PanelBody, ToggleControl, RangeControl, Icon } from '@wordpress/components';
import { icons } from '@eightshift/frontend-libs/scripts/editor';
import manifest from './../manifest.json';

export const CarouselOptions = ({ attributes, setAttributes }) => {
	const {
		blockName: manifestBlockName,
		attributes: manifestAttributes,
		options: manifestOptions,
	} = manifest;

	const {
		carouselIsLoop,
		carouselShowItems,
	} = attributes;

	return (
		<PanelBody title={__('Carousel Details', 'eightshift-frontend-libs')}>

			<ToggleControl
				label={__('Looped Mode', 'eightshift-frontend-libs')}
				checked={carouselIsLoop}
				onChange={(value) => setAttributes({ [`${manifestBlockName}IsLoop`]: value })}
			/>

			<RangeControl
				label={
					<>
						<Icon icon={icons.width} />
						{__('Items in one slide', 'eightshift-frontend-libs')}
					</>
				}
				help={__('Set number of items to show on on slide.', 'eightshift-frontend-libs')}
				allowReset={true}
				value={carouselShowItems}
				onChange={(value) => setAttributes({ [`${manifestBlockName}ShowItems`]: value })}
				min={manifestOptions.carouselItemsToShow.min}
				max={manifestOptions.carouselItemsToShow.max}
				step={manifestOptions.carouselItemsToShow.step}
				resetFallbackValue={manifestAttributes.carouselShowItems.default}
			/>

		</PanelBody>
	);
};
