import React from 'react';
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { PanelBody, ToggleControl, RangeControl, Icon } from '@wordpress/components';
import { icons } from '@eightshift/frontend-libs/scripts/editor';
import manifest from './../manifest.json';

const { attributes: reset, options } = manifest;

export const CarouselOptions = ({ attributes, setAttributes }) => {
	const {
		isLoop,
		showItems,
	} = attributes;

	return (
		<PanelBody title={__('Carousel Details', 'eightshift-frontend-libs')}>

			<ToggleControl
				label={__('Looped Mode', 'eightshift-frontend-libs')}
				checked={isLoop}
				onChange={(value) => setAttributes({ isLoop: value })}
			/>

			<RangeControl
				label={
					<Fragment>
						<Icon icon={icons.width} />
						{__('Items in one slide', 'eightshift-frontend-libs')}
					</Fragment>
				}
				help={__('Set number of items to show on on slide.', 'eightshift-frontend-libs')}
				allowReset={true}
				value={showItems}
				onChange={(value) => setAttributes({ showItems: value })}
				min={options.itemsToShow.min}
				max={options.itemsToShow.max}
				step={options.itemsToShow.step}
				resetFallbackValue={reset.showItems.default}
			/>

		</PanelBody>
	);
};
