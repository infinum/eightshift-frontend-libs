import React from 'react';
import { __ } from '@wordpress/i18n';
import { icons } from '@eightshift/ui-components/icons';
import { Button } from '@eightshift/ui-components';

/**
 * A picker for presets defined in the manifest, with additional configurable options.
 *
 * @param {object} props                                      - PresetPicker options.
 * @param {Object} props.manifest                             - Component/block manifest.
 * @param {string?} [props.configPresetsKey='configPresets']  - The key from manifest used to pull the preset data from.
 * @param {function} props.setAttributes                      - Component/block setAttributes function.
 * @param {boolean?} [props.offButton=false]                  - If provided, shows the "Off" button full-width, above all presets. Data needs to be provided in the form of an object: `{label, icon?, attributes}`.
 * @param {boolean?} [props.showAsCollapsable=false]          - If `true`, the component is rendered as a collapsable dropdown.
 * @param {boolean?} [props.controlOnly=false]                - If `true`, the presets are shown by themselves, without a base control or Collapsable to wrap it.
 * @param {boolean?} [props.excludeDefaultsFromPresets=false] - If `true`, the presets apply just the provided attributes, instead of extending the defaults.
 * @param {React.Component?} [props.icon]                     - Icon to show next to the label
 * @param {React.Component?} [props.label='Presets']          - Label of the component.
 * @param {React.Component?} [props.help]                     - Help text to explain that presets will override the current settings. Can be disabled by setting it to `false`.
 * @param {boolean?} [props.defaultButton=false]              - If `true`, the "Default" button is shown. It pulls the defaults from manifest, but can be customized by sending an object (`{label?, icon?, attributes}`) instead of `true`.
 */
export const PresetPicker = (props) => {
	const {
		manifest,
		configPresetsKey = 'configPresets',
		setAttributes,

		showAsCollapsable = false,
		controlOnly = false,

		excludeDefaultsFromPresets = false,

		icon = icons.sliders,
		label = __('Presets', 'eightshift-frontend-libs'),
		help = __('Current settings will be overwritten', 'eightshift-frontend-libs'),

		offButton = false,
		defaultButton = false,

		noBottomSpacing,
		reducedBottomSpacing,
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
		<>
			{offButton && offButton?.label && offButton?.attributes &&
				<Button
					icon={offButton?.icon ?? icons.none}
					onClick={() => setAttributes(offButton.attributes)}
					// eslint-disable-next-line max-len
					className='es-h-start es-mx-0! es-mt-0! es-mb-1! es-nested-w-7 es-nested-h-7 es-h-auto es-w-full es-h-10 es-rounded-1.5 es-border es-border-cool-gray-100 es-hover-border-cool-gray-400 es-transition es-nested-m-0! es-text-align-left es-line-h-1 es-button-icon-24'
				>
					{offButton?.label}
				</Button>
			}

			<div className='es-fifty-fifty-h es-gap-1!'>
				{defaultButton &&
					<Button
						icon={defaultButton?.icon ?? icons.checkCircle}
						onClick={() => setAttributes(defaultButton?.attributes ?? defaultManifestAttributes)}
						// eslint-disable-next-line max-len
						className='es-h-start es-m-0! es-nested-w-7 es-nested-h-7 es-h-auto es-w-full es-h-10 es-rounded-1.5 es-border es-border-cool-gray-100 es-hover-border-cool-gray-400 es-transition es-nested-m-0! es-text-align-left es-line-h-1 es-button-icon-24'
					>
						{defaultButton?.label ?? __('Default', 'eightshift-frontend-libs')}
					</Button>
				}

				{manifest[configPresetsKey].map(({ name: presetName, icon: presetIcon, attributes: presetAttrs }, i) => (
					<Button
						key={i}
						icon={icons?.[presetIcon] ?? icons.genericShapesAlt}
						onClick={() => setAttributes(
							excludeDefaultsFromPresets && defaultManifestAttributes
								? presetAttrs
								: { ...defaultManifestAttributes, ...presetAttrs }
						)}
						// eslint-disable-next-line max-len
						className='es-h-start es-m-0! es-nested-w-7 es-nested-h-7 es-h-auto es-w-full es-h-10 es-rounded-1.5 es-border es-border-cool-gray-100 es-hover-border-cool-gray-400 es-transition es-nested-m-0! es-text-align-left es-line-h-1 es-button-icon-24'
					>
						{presetName}
					</Button>
				))}
			</div>
		</>
	);

	if (controlOnly) {
		return presetsContent;
	}

	if (showAsCollapsable) {
		return (
			<Collapsable
				label={label}
				icon={icon}
				reducedBottomSpacing={reducedBottomSpacing}
				noBottomSpacing={noBottomSpacing}
			>
				<Control
					help={help}
					noBottomSpacing
				>
					{presetsContent}
				</Control>

			</Collapsable>
		);
	}

	return (
		<Control
			label={label}
			icon={icon}
			help={help}
		>
			{presetsContent}
		</Control>
	);
};
