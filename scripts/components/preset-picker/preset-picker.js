import React from 'react';
import { __ } from '@wordpress/i18n';
import { icons } from '@eightshift/ui-components/icons';
import { BaseControl, Menu, MenuItem, MenuSeparator } from '@eightshift/ui-components';

/**
 * A picker for presets defined in the manifest, with additional configurable options.
 *
 * @param {object} props - PresetPicker options.
 * @param {Object} props.manifest - Component/block manifest.
 * @param {string?} [props.configPresetsKey='configPresets'] - The key from manifest used to pull the preset data from.
 * @param {function} props.setAttributes - Component/block setAttributes function.
 * @param {boolean?} [props.offButton=false] - If provided, shows the "Off" button full-width, above all presets. Data needs to be provided in the form of an object: `{label, icon?, attributes}`.
 * @param {boolean?} [props.controlOnly=false] - If `true`, the presets are shown by themselves, without a base control or Collapsable to wrap it.
 * @param {boolean?} [props.excludeDefaultsFromPresets=false] - If `true`, the presets apply just the provided attributes, instead of extending the defaults.
 * @param {React.Component?} [props.icon] - Icon to show next to the label
 * @param {React.Component?} [props.label='Presets'] - Label of the component.
 * @param {React.Component?} [props.help] - Help text to explain that presets will override the current settings. Can be disabled by setting it to `false`.
 * @param {boolean?} [props.defaultButton=false] - If `true`, the "Default" button is shown. It pulls the defaults from manifest, but can be customized by sending an object (`{label?, icon?, attributes}`) instead of `true`.
 */
export const PresetPicker = (props) => {
	const {
		manifest,
		configPresetsKey = 'configPresets',
		setAttributes,

		controlOnly = false,

		excludeDefaultsFromPresets = false,

		icon = icons.sliders,
		label = __('Presets', 'eightshift-frontend-libs'),
		help = __('Current settings will be overwritten', 'eightshift-frontend-libs'),

		offButton = false,
		defaultButton = false,
	} = props;

	if (manifest?.[configPresetsKey]?.length < 1) {
		return null;
	}

	const defaultManifestAttributes = Object.entries(manifest.attributes).reduce((curr, [k, v]) => {
		if ('default' in v) {
			return {
				...curr,
				[k]: v.default,
			};
		}

		return {
			...curr,
			[k]: undefined,
		};
	}, {});

	const presetsContent = (
		<Menu
			triggerLabel={__('Select a preset', 'eightshift-frontend-libs')}
			keepOpen
		>
			{offButton && offButton?.label && offButton?.attributes && (
				<>
					<MenuItem
						icon={offButton?.icon ?? icons.none}
						onClick={() => setAttributes(offButton.attributes)}
					>
						{offButton?.label}
					</MenuItem>

					<MenuSeparator />
				</>
			)}

			{defaultButton && (
				<>
					<MenuItem
						icon={defaultButton?.icon ?? icons.checkCircle}
						onClick={() => setAttributes(defaultButton?.attributes ?? defaultManifestAttributes)}
					>
						{defaultButton?.label ?? __('Default', 'eightshift-frontend-libs')}
					</MenuItem>

					<MenuSeparator />
				</>
			)}

			{manifest[configPresetsKey].map(({ name: presetName, icon: presetIcon, attributes: presetAttrs }, i) => (
				<MenuItem
					key={i}
					icon={icons?.[presetIcon] ?? icons.genericShapesAlt}
					onClick={() =>
						setAttributes(
							excludeDefaultsFromPresets && defaultManifestAttributes
								? presetAttrs
								: { ...defaultManifestAttributes, ...presetAttrs },
						)
					}
				>
					{presetName}
				</MenuItem>
			))}
		</Menu>
	);

	if (controlOnly) {
		return presetsContent;
	}

	return (
		<BaseControl
			label={label}
			icon={icon}
			help={help}
			inline
		>
			{presetsContent}
		</BaseControl>
	);
};
