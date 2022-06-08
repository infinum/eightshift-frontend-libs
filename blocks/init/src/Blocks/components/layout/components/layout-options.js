import React from 'react';
import { __, sprintf } from '@wordpress/i18n';
import { RangeControl } from '@wordpress/components';
import {
	icons,
	IconLabel,
	getAttrKey,
	checkAttr,
	getOption,
	SimpleVerticalSingleSelect,
	CollapsableComponentUseToggle
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
		<CollapsableComponentUseToggle
			label={sprintf(__('%s', 'eightshift-boilerplate'), label)}
			checked={layoutUse}
			onChange={(value) => setAttributes({ [getAttrKey('layoutUse', attributes, manifest)]: value })}
			showUseToggle={showLayoutUse}
			showLabel={label}
		>
			<>
				{showLayoutType &&
					<SimpleVerticalSingleSelect
						label={<IconLabel icon={icons.backgroundTypeAlt} label={__('Layout Type', 'eightshift-boilerplate')} />}
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
						label={<IconLabel icon={icons.totalItems} label={__('Maximum number of items to show', 'eightshift-boilerplate')} />}
						{...getOption('layoutTotalItems', attributes, manifest)}
						value={layoutTotalItems}
						allowReset={true}
						onChange={(value) => setAttributes({ [getAttrKey('layoutTotalItems', attributes, manifest)]: value })}
						resetFallbackValue={reset['layoutTotalItems'].default}
					/>
				}
			</>
		</CollapsableComponentUseToggle>
	);
};
