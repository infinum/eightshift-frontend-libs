import React from 'react';
import { __ } from '@wordpress/i18n';
import { BaseControl, __experimentalNumberControl as ExperimentalNumberControl, NumberControl as StableNumberControl } from '@wordpress/components';
import {
	icons,
	IconLabel,
	getAttrKey,
	checkAttr,
	getOption,
	CollapsableComponentUseToggle,
	SimpleHorizontalSingleSelect
} from '@eightshift/frontend-libs/scripts';
import manifest from '../manifest.json';

export const LayoutOptions = (attributes) => {
	const {
		title: manifestTitle,
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

	const layouts = getOption('layoutType', attributes, manifest);

	const NumberControl = ExperimentalNumberControl ?? StableNumberControl;

	return (
		<CollapsableComponentUseToggle
			label={
				<IconLabel
					icon={showLayoutUse ? null : icons.layoutAlt3}
					label={label}
					subtitle={layoutType !== null ? layouts.find(({ value }) => value === layoutType).label : ''}
					standalone
				/>
			}
			checked={layoutUse}
			onChange={(value) => setAttributes({ [getAttrKey('layoutUse', attributes, manifest)]: value })}
			showUseToggle={showLayoutUse}
			showLabel={label}
		>
			{showLayoutType &&
				<SimpleHorizontalSingleSelect
					onChange={(value) => setAttributes({
						[getAttrKey('layoutType', attributes, manifest)]: value,
						[getAttrKey('layoutTotalItems', attributes, manifest)]: combinations.layoutType[value].layoutTotalItems,
					})}
					value={layoutType}
					options={layouts}
					alignment='vertical'
					border='offset'
				/>
			}

			{showLayoutTotalItems &&
				<BaseControl
					label={<IconLabel icon={icons.itemLimit} label={__('Max. number of items', 'eightshift-frontend-libs')} />}
					className='es-inline-input-label-14'
				>
					<NumberControl
						{...getOption('layoutTotalItems', attributes, manifest)}
						value={layoutTotalItems}
						onChange={(value) => setAttributes({ [getAttrKey('layoutTotalItems', attributes, manifest)]: value })}
						isDragEnabled
					/>
				</BaseControl>
			}
		</CollapsableComponentUseToggle>
	);
};
