import React from 'react';
import { Fragment } from '@wordpress/element';
import { __, sprintf } from '@wordpress/i18n';
import { RangeControl } from '@wordpress/components';
import {
	icons,
	IconLabel,
	getAttrKey,
	checkAttr,
	getOption,
	SimpleVerticalSingleSelect,
	ComponentUseToggle
} from '@eightshift/frontend-libs/scripts';
import manifest from '../manifest.json';

export const LayoutOptions = (attributes) => {
	const {
		title: manifestTitle,
		attributes: reset,
		combinations,
	} = manifest;

	const {
		setAttributes,
		label = manifestTitle,
		layoutShowControls = true,

		showLayoutUse = true,
		showLayoutType = true,
		showLayoutTotalItems = true,
	} = attributes;

	if (!layoutShowControls) {
		return null;
	}

	const layoutUse = checkAttr('layoutUse', attributes, manifest);
	const layoutType = checkAttr('layoutType', attributes, manifest);
	const layoutTotalItems = checkAttr('layoutTotalItems', attributes, manifest);
	

	return (
		<>
			<ComponentUseToggle
				label={sprintf(__('%s', 'eightshift-frontend-libs'), label)}
				checked={layoutUse}
				onChange={(value) => setAttributes({ [getAttrKey('layoutUse', attributes, manifest)]: value })}
				showUseToggle={showLayoutUse}
				showLabel={label}
			/>

			{layoutUse &&
				<>

					{showLayoutType &&
						<SimpleVerticalSingleSelect
							label={<IconLabel icon={icons.backgroundTypeAlt} label={__('Layout Type', 'eightshift-frontend-libs')} />}
							options={getOption('layoutType', attributes, manifest).map(({ label, value, icon: iconName }) => {
								return {
									onClick: () => setAttributes({
										[getAttrKey('layoutType', attributes, manifest)]: value,
										[getAttrKey('layoutTotalItems', attributes, manifest)]: combinations.layoutType[value].layoutTotalItems,
									}),
									label: label,
									isActive: layoutType === value,
									icon: icons[iconName],
								};
							})}
						/>
					}

					{showLayoutTotalItems &&
						<RangeControl
							label={<IconLabel icon={icons.totalItems} label={__('Maximum items to show', 'eightshift-frontend-libs')} />}
							{...getOption('layoutTotalItems', attributes, manifest)}
							value={layoutTotalItems}
							allowReset={true}
							onChange={(value) => setAttributes({ [getAttrKey('layoutTotalItems', attributes, manifest)]: value })}
							resetFallbackValue={reset['layoutTotalItems'].default}
						/>
					}
				</>
			}
		</>
	);
};
