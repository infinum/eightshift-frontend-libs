import React from 'react';
import { checkAttr, CollapsableComponentUseToggle, getAttrKey, props, getOptions } from '@eightshift/frontend-libs/scripts';
import manifest from '../manifest.json';
import { ButtonOptions } from '../../button/components/button-options';

export const LoadMoreOptions = (attributes) => {
	const {
		title: manifestTitle,
	} = manifest;

	const {
		setAttributes,
		label = manifestTitle,
		loadMoreShowControls = true,
		showLoadMoreUse = true,
		showLabel = true,

		loadMoreUse = checkAttr('loadMoreUse', attributes, manifest),
	} = attributes;

	if (!loadMoreShowControls) {
		return null;
	}

	return (
		<CollapsableComponentUseToggle
			label={label}
			checked={loadMoreUse}
			onChange={(value) => setAttributes({ [getAttrKey('loadMoreUse', attributes, manifest)]: value })}
			showUseToggle={showLoadMoreUse}
			showLabel={showLabel}
		>
			<ButtonOptions
				{...props('button', attributes, {
					options: getOptions(attributes, manifest),
				})}
			/>
		</CollapsableComponentUseToggle>
	);
};
