import React from 'react'; // eslint-disable-line no-unused-vars
import { __, sprintf } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { SelectControl, ToggleControl } from '@wordpress/components';
import { checkAttr } from '@eightshift/frontend-libs/scripts/helpers';
import manifest from './../manifest.json';

const { options, title } = manifest;

export const IconOptions = (attributes) => {
	const {
		setAttributes,
		componentName = manifest.componentName,
		label = title,
		iconUse = checkAttr('iconUse', attributes, manifest, componentName),
		iconName = checkAttr('iconName', attributes, manifest, componentName),
		showIconOptions = true,
	} = attributes;

	if (!showIconOptions) {
		return null;
	}

	return (
		<Fragment>
			{label && <h3 className={'options-label'}>{label}</h3>}

			<ToggleControl
				label={sprintf(__('Use %s', 'eightshift-frontend-libs'), label)}
				checked={iconUse}
				onChange={(value) => setAttributes({ [`${componentName}Use`]: value })}
			/>

			{iconUse && (
				<SelectControl
					label={__('Icon', 'eightshift-frontend-libs')}
					value={iconName}
					options={options.icons}
					onChange={(value) => setAttributes({ [`${componentName}Name`]: value })}
				/>

			)}
		</Fragment>
	);
};
