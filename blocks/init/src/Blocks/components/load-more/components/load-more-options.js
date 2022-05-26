import React from 'react';
import { __, sprintf } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { ToggleControl, TextControl } from '@wordpress/components';
import { checkAttr, camelize } from '@eightshift/frontend-libs/scripts/helpers';
import manifest from '../manifest.json';

const { title } = manifest;

export const LoadMoreOptions = (attributes) => {
	const {
		setAttributes,
		componentName = manifest.componentName,
		label = title,
		loadMoreShowControls = true,

		loadMoreContent = checkAttr('loadMoreContent', attributes, manifest, componentName),

		loadMoreUse = checkAttr('loadMoreUse', attributes, manifest, componentName),

	} = attributes;

	if (!loadMoreShowControls) {
		return null;
	}

	return (
		<Fragment>

			{label &&
				<h3 className={'options-label'}>
					{label}
				</h3>
			}

			<ToggleControl
				label={sprintf(__('Use %s', 'eightshift-boilerplate'), label)}
				checked={loadMoreUse}
				onChange={(value) => setAttributes({ [`${camelize(componentName)}Use`]: value })}
			/>

			<TextControl
				label={__('Content', 'eightshift-boilerplate')}
				value={loadMoreContent}
				onChange={(value) => setAttributes({ [`${camelize(componentName)}Content`]: value })}
			/>
		</Fragment>
	);
};
