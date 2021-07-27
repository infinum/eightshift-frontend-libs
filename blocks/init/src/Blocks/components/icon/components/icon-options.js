import React from 'react';
import { __ } from '@wordpress/i18n';
import { checkAttr, getAttrKey, getOption, CustomSelect, ComponentUseToggle } from '@eightshift/frontend-libs/scripts';
import { components } from 'react-select';
import manifest from './../manifest.json';

const {
	icons: manifestIcons,
} = manifest;

const IconPickerOption = props => (
	<components.Option {...props}>
		<div className='icon-option-row'>
			<i dangerouslySetInnerHTML={{ __html: manifestIcons[props.value] }}></i>
			<span>{props.label}</span>
		</div>
	</components.Option>
);

const IconPickerValueDisplay = ({ children, ...props }) => (
	<components.SingleValue {...props}>
		<div className='icon-option-row icon-option-row--color'>
			<i dangerouslySetInnerHTML={{ __html: manifestIcons[props.data.value] }}></i>
			<span>{children}</span>
		</div>
	</components.SingleValue>
);

export const IconOptions = (attributes) => {
	const {
		title: manifestTitle,
	} = manifest;


	const {
		setAttributes,
		label = manifestTitle,
		showIconOptions = true,
		showIconUse = true,
		showLabel = true,
	} = attributes;

	if (!showIconOptions) {
		return null;
	}

	const iconUse = checkAttr('iconUse', attributes, manifest);
	const iconName = checkAttr('iconName', attributes, manifest);

	return (
		<>
			<ComponentUseToggle
				label={label}
				checked={iconUse}
				onChange={(value) => setAttributes({ [getAttrKey('iconUse', attributes, manifest)]: value })}
				showUseToggle={showIconUse}
				showLabel={showLabel}
			/>

			{iconUse && (
				<CustomSelect
					value={iconName}
					options={getOption('iconName', attributes, manifest)}
					placeholder={__('Select an icon', 'newboilerplate')}
					customOptionComponent={IconPickerOption}
					customSingleValueDisplayComponent={IconPickerValueDisplay}
					onChange={(value) => setAttributes({[getAttrKey('iconName', attributes, manifest)]: value?.value})}
				/>
			)}
		</>
	);
};
