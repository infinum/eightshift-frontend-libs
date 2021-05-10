import React from 'react';
import { __, sprintf } from '@wordpress/i18n';
import { AlignmentToolbar } from '@wordpress/block-editor';
import { checkAttr } from '@eightshift/frontend-libs/scripts/helpers';
import manifest from '../manifest.json';

export const ListsToolbar = (attributes) => {
	const {
		componentName: manifestComponentName,
		title: manifestTitle,
		options: manifestOptions,
	} = manifest;

	const {
		setAttributes,
		componentName = manifestComponentName,
		label = manifestTitle,
		options = manifestOptions,
		listsShowControls = true,

		listsUse = checkAttr('listsUse', attributes, manifest, componentName),

		listsAlign = checkAttr('listsAlign', attributes, manifest, componentName),

		showListsAlign = true,
	} = attributes;

	if (!listsShowControls) {
		return null;
	}

	return (
		<>
			{listsUse &&
				<>
					{showListsAlign &&
						<AlignmentToolbar
							value={listsAlign}
							options={options.aligns}
							label={sprintf(__('%s text align', 'eightshift-frontend-libs'), label)}
							onChange={(value) => setAttributes({ [`${componentName}Align`]: value })}
						/>
					}
				</>
			}
		</>
	);
};
