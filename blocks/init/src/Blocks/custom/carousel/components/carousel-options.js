import React from 'react';
import { __ } from '@wordpress/i18n';
import { PanelBody, ToggleControl, RangeControl, Icon } from '@wordpress/components';
import { icons, checkAttr, getAttrKey } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';

export const CarouselOptions = ({ attributes, setAttributes }) => {
	const {
		attributes: manifestAttributes,
		options: manifestOptions,
	} = manifest;

	const carouselIsLoop = checkAttr('carouselIsLoop', attributes, manifest);
	const carouselShowItems = checkAttr('carouselShowItems', attributes, manifest);

	return (
		<PanelBody title={__('Carousel Details', 'eightshift-frontend-libs')}>

			<ToggleControl
				label={__('Looped Mode', 'eightshift-frontend-libs')}
				checked={carouselIsLoop}
				onChange={(value) => setAttributes({ [getAttrKey('carouselIsLoop', attributes, manifest)]: value })}
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
				onChange={(value) => setAttributes({ [getAttrKey('carouselShowItems', attributes, manifest)]: value })}
				min={manifestOptions.carouselItemsToShow.min}
				max={manifestOptions.carouselItemsToShow.max}
				step={manifestOptions.carouselItemsToShow.step}
				resetFallbackValue={manifestAttributes.carouselShowItems.default}
			/>

		</PanelBody>
	);
};
