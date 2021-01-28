import React from 'react'; // eslint-disable-line no-unused-vars
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { SelectControl, ToggleControl, Icon } from '@wordpress/components';
import { ColorPaletteCustom } from '@eightshift/frontend-libs/scripts/components';
import { checkAttr } from '@eightshift/frontend-libs/scripts/helpers';
import { getOptionColors, icons } from '@eightshift/frontend-libs/scripts/editor';
import manifest from './../manifest.json';

const { options, title } = manifest;

export const IconOptions = (attributes) => {
	const {
		setAttributes,
		componentName = manifest.componentName,
		label = title,
		iconUse = checkAttr('iconUse', attributes, manifest, componentName),
		iconName = checkAttr('iconName', attributes, manifest, componentName),
		iconColor = checkAttr('iconColor', attributes, manifest, componentName),
		showIconOptions = true,
	} = attributes;

	if (!showIconOptions) {
		return null;
	}

	return (
		<Fragment>
			{label && <h3 className={'options-label'}>{label}</h3>}

			<ToggleControl
				label={__('Use Icon', 'eightshift-frontend-libs')}
				checked={iconUse}
				onChange={(value) => setAttributes({ [`${componentName}Use`]: value })}
			/>

			{iconUse && (
				<Fragment>
					<SelectControl
						label={__('Icon', 'eightshift-frontend-libs')}
						value={iconName}
						options={options.icons}
						onChange={(value) => setAttributes({ [`${componentName}Name`]: value })}
					/>

					<ColorPaletteCustom
						label={
							<Fragment>
								<Icon icon={icons.color} />
								{__('Icon color', 'eightshift-frontend-libs')}
							</Fragment>
						}
						value={iconColor}
						colors={getOptionColors(options.colors)}
						onChange={(value) => setAttributes({ [`${componentName}Color`]: value })}
					/>
				</Fragment>

			)}
		</Fragment>
	);
};
