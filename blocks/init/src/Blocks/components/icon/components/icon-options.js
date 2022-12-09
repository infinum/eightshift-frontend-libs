import React from 'react';
import { __ } from '@wordpress/i18n';
import { checkAttr, getAttrKey, getOption, CustomSelect, CustomSelectCustomOption, CustomSelectCustomValueDisplay, CollapsableComponentUseToggle } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';

const {
	icons: manifestIcons,
} = manifest;

const IconPickerOption = props => (
	<CustomSelectCustomOption {...props}>
		<div className='es-h-spaced es-gap-2.5!'>
			<i className='es-line-h-0! es-w-6 es-h-6 es-display-flex es-items-center es-content-center' dangerouslySetInnerHTML={{ __html: manifestIcons[props.value] }}></i>
			<span>{props.label}</span>
		</div>
	</CustomSelectCustomOption>
);

const IconPickerValueDisplay = ({ children, ...props }) => (
	<CustomSelectCustomValueDisplay {...props}>
		<div className='es-h-spaced es-gap-2.5!'>
			<i className='es-line-h-0! es-w-6 es-h-6 es-display-flex es-items-center es-content-center es-nested-color-admin-accent' dangerouslySetInnerHTML={{ __html: manifestIcons[props.data.value] }}></i>
			<span>{children}</span>
		</div>
	</CustomSelectCustomValueDisplay>
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
		showIconSize = true,
		showLabel = true,

		showExpanderButton = true,
	} = attributes;

	if (!showIconOptions) {
		return null;
	}

	const iconUse = checkAttr('iconUse', attributes, manifest);
	const iconName = checkAttr('iconName', attributes, manifest);
	const iconSize = checkAttr('iconSize', attributes, manifest);

	return (
		<CollapsableComponentUseToggle
			label={label}
			checked={iconUse}
			onChange={(value) => setAttributes({ [getAttrKey('iconUse', attributes, manifest)]: value })}
			showUseToggle={showIconUse}
			showLabel={showLabel}
			showExpanderButton={showExpanderButton}
		>
			<CustomSelect
				value={iconName}
				options={getOption('iconName', attributes, manifest)}
				placeholder={__('Select an icon', 'eightshift-frontend-libs')}
				customOptionComponent={IconPickerOption}
				customSingleValueDisplayComponent={IconPickerValueDisplay}
				onChange={(value) => setAttributes({ [getAttrKey('iconName', attributes, manifest)]: value })}
				isClearable={false}
				additionalClasses={showIconSize ? 'es-mb-3.5' : ''}
				simpleValue
			/>

			{showIconSize &&
				<CustomSelect
					label={__('Size', 'eightshift-frontend-libs')}
					value={iconSize}
					options={getOption('iconSize', attributes, manifest)}
					onChange={(value) => setAttributes({ [getAttrKey('iconSize', attributes, manifest)]: value })}
					additionalClasses='es-max-w-20'
					border='offset'
					isSearchable={false}
					isClearable={false}
					simpleValue
				/>
			}
		</CollapsableComponentUseToggle>
	);
};
