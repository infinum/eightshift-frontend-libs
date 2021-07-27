import React from 'react';
import { __ } from '@wordpress/i18n';
import { PanelBody, RangeControl, BaseControl } from '@wordpress/components';
import { icons, checkAttr, getAttrKey, IconLabel, IconToggle } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';

export const CarouselOptions = ({ attributes, setAttributes }) => {
	const {
		options: manifestOptions,
	} = manifest;

	const carouselIsLoop = checkAttr('carouselIsLoop', attributes, manifest);
	const carouselShowItems = checkAttr('carouselShowItems', attributes, manifest);
	const carouselShowPrevNext = checkAttr('carouselShowPrevNext', attributes, manifest);
	const carouselShowPagination = checkAttr('carouselShowPagination', attributes, manifest);

	return (
		<PanelBody title={__('Carousel', 'newboilerplate')}>

			<IconToggle
				icon={icons.loopMode}
				label={__('Loop mode', 'newboilerplate')}
				help={__('Allows infinite scrolling through the items.', 'newboilerplate')}
				checked={carouselIsLoop}
				onChange={(value) => setAttributes({ [getAttrKey('carouselIsLoop', attributes, manifest)]: value })}
			/>

			<hr />

			<IconToggle
				icon={icons.arrowsHorizontal}
				label={__('Navigation buttons', 'newboilerplate')}
				checked={carouselShowPrevNext}
				onChange={(value) => setAttributes({ [getAttrKey('carouselShowPrevNext', attributes, manifest)]: value })}
			/>

			<IconToggle
				icon={icons.order}
				label={__('Pagination', 'newboilerplate')}
				checked={carouselShowPagination}
				onChange={(value) => setAttributes({ [getAttrKey('carouselShowPagination', attributes, manifest)]: value })}
			/>

			<hr />

			<BaseControl
				label={<IconLabel icon={icons.visible} label={__('Number of slides visible', 'newboilerplate')} />}
				help={__('Number of items to show at a time (on tablet width and up).', 'newboilerplate')}
			/>
			<IconToggle
				label={__('Automatic', 'newboilerplate')}
				help={__('Fit as many as possible.', 'newboilerplate')}
				checked={carouselShowItems === -1}
				onChange={(value) => setAttributes({ [getAttrKey('carouselShowItems', attributes, manifest)]: value ? -1 : 1 })}
			/>

			{carouselShowItems !== -1 &&
				<RangeControl
					label={__('Slides visible', 'newboilerplate')}
					value={carouselShowItems}
					onChange={(value) => setAttributes({ [getAttrKey('carouselShowItems', attributes, manifest)]: value })}
					min={manifestOptions.carouselItemsToShow.min}
					max={manifestOptions.carouselItemsToShow.max}
					step={manifestOptions.carouselItemsToShow.step}
				/>
			}


		</PanelBody>
	);
};
