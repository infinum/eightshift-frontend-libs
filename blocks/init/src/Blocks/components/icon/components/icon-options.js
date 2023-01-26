import React from 'react';
import { __ } from '@wordpress/i18n';
import { checkAttr, getAttrKey, getOption, UseToggle, RSOption, Select, generateUseToggleConfig } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';
import { RSSingleValue } from '@eightshift/frontend-libs/scripts/components/custom-select/react-select-component-wrappers';

const {
	icons: manifestIcons,
} = manifest;

const IconPickerOption = props => (
	<RSOption {...props}>
		<div className='es-h-spaced es-gap-2.5!'>
			<i className='es-line-h-0! es-w-6 es-h-6 es-display-flex es-items-center es-content-center' dangerouslySetInnerHTML={{ __html: manifestIcons[props.value] }}></i>
			<span>{props.label}</span>
		</div>
	</RSOption>
);

const IconPickerValueDisplay = ({ children, ...props }) => (
	<RSSingleValue {...props}>
		<div className='es-h-spaced es-gap-2.5!'>
			<i className='es-line-h-0! es-w-6 es-h-6 es-display-flex es-items-center es-content-center es-nested-color-cool-gray-500' dangerouslySetInnerHTML={{ __html: manifestIcons[props.data.value] }}></i>
			<span>{children}</span>
		</div>
	</RSSingleValue>
);

export const IconOptions = (attributes) => {
	const {
		setAttributes,
		hideSizePicker = true,
	} = attributes;

	const iconName = checkAttr('iconName', attributes, manifest);
	const iconSize = checkAttr('iconSize', attributes, manifest);

	return (
		<UseToggle {...generateUseToggleConfig(attributes, manifest, 'iconUse')}>
			<Select
				value={iconName}
				options={getOption('iconName', attributes, manifest)}
				placeholder={__('Select an icon', 'eightshift-frontend-libs')}
				customMenuOption={IconPickerOption}
				customValueDisplay={IconPickerValueDisplay}
				onChange={(value) => setAttributes({ [getAttrKey('iconName', attributes, manifest)]: value })}
				additionalClasses={hideSizePicker ? '' : 'es-mb-3'}
				noBottomSpacing
				simpleValue
			/>

			{!hideSizePicker &&
				<Select
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
		</UseToggle>
	);
};
