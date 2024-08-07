import React from 'react';
import { __ } from '@wordpress/i18n';
import {
	checkAttr,
	getAttrKey,
	getOption,
	UseToggle,
	RSOption,
	Select,
	generateUseToggleConfig,
	RSSingleValue,
} from '@eightshift/frontend-libs/scripts';
import { clsx } from '@eightshift/ui-components/utilities';
import manifest from './../manifest.json';

const {
	icons: manifestIcons,
} = manifest;

const IconPickerOption = props => (
	<RSOption {...props}>
		<div className='es-h-spaced es-gap-2.5!'>
			<i
				className='es-line-h-0! es-w-6 es-h-6 es-display-flex es-items-center es-content-center'
				dangerouslySetInnerHTML={{ __html: manifestIcons[props.value] }}
			/>
			<span>{props.label}</span>
		</div>
	</RSOption>
);

const IconPickerValueDisplay = ({ children, ...props }) => (
	<RSSingleValue {...props}>
		<div className='es-h-spaced es-gap-2.5!'>
			<i
				className='es-line-h-0! es-w-6 es-h-6 es-display-flex es-items-center es-content-center es-nested-color-cool-gray-500'
				dangerouslySetInnerHTML={{ __html: manifestIcons[props.data.value] }}
			/>
			<span>{children}</span>
		</div>
	</RSSingleValue>
);

export const IconOptions = (attributes) => {
	const {
		setAttributes,
		hideSizePicker = false,
	} = attributes;

	const iconName = checkAttr('iconName', attributes, manifest);
	const iconSize = checkAttr('iconSize', attributes, manifest);

	return (
		<UseToggle {...generateUseToggleConfig(attributes, manifest, 'iconUse')}>
			<div className='es-h-spaced'>
				<Select
					value={iconName}
					options={getOption('iconName', attributes, manifest)}
					placeholder={__('Select an icon', '%g_textdomain%')}
					customMenuOption={IconPickerOption}
					customValueDisplay={IconPickerValueDisplay}
					onChange={(value) => setAttributes({ [getAttrKey('iconName', attributes, manifest)]: value })}
					additionalClasses={clsx('es-flex-grow-1', !hideSizePicker && 'es-max-w-52')}
					noBottomSpacing
					simpleValue
				/>

				{!hideSizePicker &&
					<Select
						value={iconSize}
						options={getOption('iconSize', attributes, manifest)}
						onChange={(value) => setAttributes({ [getAttrKey('iconSize', attributes, manifest)]: value })}
						additionalSelectClasses='es-max-w-14'
						additionalClasses='es-flex-shrink-0'
						noBottomSpacing
						simpleValue
						noSearch
					/>
				}
			</div>
		</UseToggle>
	);
};
