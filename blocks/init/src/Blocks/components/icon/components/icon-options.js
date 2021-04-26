import React from 'react'; // eslint-disable-line no-unused-vars
import { __, sprintf } from '@wordpress/i18n';
import { ToggleControl } from '@wordpress/components';
import { checkAttr } from '@eightshift/frontend-libs/scripts/helpers';
import { CustomSelect } from '@eightshift/frontend-libs/scripts/components';
import { components } from 'react-select';

import manifest from './../manifest.json';

const { icons } = manifest;

const IconPickerOption = props => {
	return (
		<components.Option {...props}>
			<div className={'icon-option-row'}>
				<i dangerouslySetInnerHTML={{ __html: icons[props.value] }}></i>
				<span>{props.label}</span>
			</div>
		</components.Option>
	);
};

const IconPickerValueDisplay = ({ children, ...props }) => (
	<components.SingleValue {...props}>
		<div className={'icon-option-row'}>
			<i dangerouslySetInnerHTML={{ __html: icons[props.data.value] }}></i>
			<span>{children}</span>
		</div>
	</components.SingleValue>
);

export const IconOptions = (attributes) => {
	const { options, title } = manifest;

	const {
		setAttributes,
		componentName = manifest.componentName,
		label = title,
		iconUse = checkAttr('iconUse', attributes, manifest, componentName),
		iconSelectedIcon = checkAttr('iconSelectedIcon', attributes, manifest, componentName),
		showIconOptions = true,
	} = attributes;

	if (!showIconOptions) {
		return null;
	}

	return (
		<>
			{label && <h3 className={'options-label'}>{label}</h3>}

			<ToggleControl
				label={sprintf(__('Use %s', 'eightshift-frontend-libs'), label)}
				checked={iconUse}
				onChange={(value) => setAttributes({ [`${componentName}Use`]: value })}
			/>

			{iconUse && (
				<CustomSelect
					label={__('Icon', 'eightshift-frontend-libs')}
					value={iconSelectedIcon}
					options={options.icons}
					placeholder={__('Select an icon', 'eightshift-frontend-libs')}
					customOptionComponent={IconPickerOption}
					customSingleValueDisplayComponent={IconPickerValueDisplay}
					onChange={(value) => (
						// Because react-select needs an object instead
						// of a label for storing data, this approach was
						// taken to prevent breaking everything that
						// currently uses an icon
						setAttributes({
							[`${componentName}SelectedIcon`]: value,
							[`${componentName}Name`]: value?.value,
						})
					)}
				/>
			)}
		</>
	);
};
