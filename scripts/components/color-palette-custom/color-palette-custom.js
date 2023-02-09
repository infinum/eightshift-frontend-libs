import React, { useState } from 'react';
import { __ } from '@wordpress/i18n';
import { Button, TextControl, Tooltip } from '@wordpress/components';
import { icons } from '@eightshift/frontend-libs/scripts';
import classnames from 'classnames';
import { select } from '@wordpress/data';
import { STORE_NAME } from './../../editor/store';
import { Control } from '../base-control/base-control';
import { ColorSwatch } from '../color-swatch/color-swatch';

/**
 * Modified version of WordPress's `ColorPalette` which saves values as color names/slugs instead of hex codes.
 *
 * @typedef {'tiles'|'list'|'listTwoCol'} ColorPaletteLayout
 *
 * @param {object} props                              - ColorPalette options.
 * @param {array} props.colors                        - Colors to display.
 * @param {object} props.value                        - Current value.
 * @param {function} props.onChange                   - Function called when the value is modified.
 * @param {boolean} [props.clearable=false]           - If `true`, the color palette will have a *Clear* button.
 * @param {string?} [props.label]                     - Label displayed above the picker.
 * @param {string?} [props.help]                      - Help text displayed below the picker.
 * @param {React.Component?} [props.icon]             - Icon to show next to the label
 * @param {boolean?} [props.noBottomSpacing]          - If `true`, space below the control is removed.
 * @param {boolean?} [props.reducedBottomSpacing]     - If `true`, space below the control is reduced.
 * @param {boolean?} [props.inlineLabel]              - If `true`, the label is displayed inline with the control. In that case `actions` are shown below the control.
 * @param {ColorPaletteLayout} [props.layout='tiles'] - Determines the layout of the control.
 * @param {boolean} [props.searchable=false]          - If `true`, the list of color can be searched through.
 * @param {boolean} [props.disabled]                  - If `true`, the component can't be interacted with.
 * @param {boolean} [props.noShadeGrouping=false]     - If `false`, color swatches will be grouped if there are 2 or more colors with the same beginning of the name, but different ending (-50, -100, ..., -900 or -10, -20, ..., -90).
 * @param {React.Component?} [props.subtitle]         - Subtitle below the label.
 * @param {React.Component?} [props.actions]          - Actions to show to the right of the label.
 */
export const ColorPalette = (props) => {
	const {
		colors = select(STORE_NAME).getSettings().globalVariables.colors,
		value,
		onChange,
		clearable = false,
		label,
		help,
		icon,
		reducedBottomSpacing,
		noBottomSpacing,
		inlineLabel,
		layout = 'tiles',
		searchable = false,
		disabled,
		noShadeGrouping = false,
		subtitle,
		actions,
	} = props;

	const colorSuffixRegex = /(?!^.+)(-?(?:50|100|200|300|400|500|600|700|800|900|10|20|30|40|50|60|70|80|90){1})$/gi;

	let groupedColors = { generic: colors };

	if (!noShadeGrouping) {
		groupedColors = colors.reduce((output, current) => {
			// Bailout if a color is invalid.
			if (current === undefined || current?.name === undefined || current?.slug === undefined) {
				return output;
			}

			if (current.slug.match(colorSuffixRegex)?.length) {
				const newSlug = current.name.replace(colorSuffixRegex, '').trim();

				if (!output[newSlug]) {
					output[newSlug] = [];
				}

				output[newSlug] = [
					...output[newSlug],
					{
						...current,
						shade: current.slug.match(colorSuffixRegex)[0].replace('-', ''),
					},
				];
			} else {
				output.generic = [
					...output.generic,
					current,
				];
			}

			return output;
		}, { generic: [] });

		// Don't show color groups if only one color would end up in the group.
		for (let [colorName, colors] of Object.entries(groupedColors)) {
			if (colors.length === 1 && colorName !== 'generic') {
				groupedColors.generic.push(colors[0]);

				delete groupedColors[colorName];
			}
		}
	}

	const [filteredColors, setFilteredColors] = useState(groupedColors);
	const [searchTerm, setSearchTerm] = useState('');

	const detailView = layout === 'list' || layout === 'listTwoCol';

	const searchEmptyIcon = React.cloneElement(icons.searchEmpty, { className: 'es-w-8 es-h-8 es-has-wp-admin-theme-color' });

	let layoutClasses = 'es-h-spaced-wrap es-gap-0!';

	if (layout === 'list') {
		layoutClasses = 'es-v-spaced es-gap-0!';
	}

	if (layout === 'listTwoCol') {
		layoutClasses = 'es-fifty-fifty-h-wrap es-gap-0!';
	}

	return (
		<Control
			icon={icon}
			label={label}
			help={help}
			subtitle={subtitle}
			actions={actions}
			reducedBottomSpacing={reducedBottomSpacing}
			noBottomSpacing={noBottomSpacing}
			inlineLabel={inlineLabel}
		>
			{searchable &&
				<TextControl
					disabled={disabled}
					placeholder={__('Search colors', 'eightshift-frontend-libs')}
					className='es-mb-2!'
					onChange={(v) => {
						setSearchTerm(v);

						if (v.trim().length === 0) {
							setFilteredColors(groupedColors);
							return;
						}

						const filtered = Object.entries(groupedColors).reduce((output, [groupName, groupColors]) => {
							const filteredColors = groupColors.filter(({ name }) => name.trim().toLowerCase().includes(v.toLowerCase()));

							if (filteredColors.length > 0) {
								output[groupName] = filteredColors;
							}

							return output;
						}, {});

						setFilteredColors(filtered);
					}}
				/>
			}

			{Object.values(filteredColors).every((colors) => colors.length < 1) && searchTerm?.length > 0 &&
				<div className='es-v-center'>
					{searchEmptyIcon}
					<span>{__('No matches for', 'eightshift-frontend-libs')} <b>{searchTerm}</b></span>
				</div>
			}

			{Object.entries(filteredColors).map(([groupName, groupColors], i) => {
				const isOtherColors = groupName === 'generic';

				if (groupColors?.length === 0 || isOtherColors) {
					return null;
				}

				return (
					<Control label={!isOtherColors && groupName} key={i} additionalClasses='es-mb-1!' additionalLabelClasses='es-mb-1.5!' noBottomSpacing>
						<div className='es-h-spaced-wrap es-gap-0!'>
							{groupColors.map(({ name, slug, color }, j) => {
								return (
									<Tooltip text={name} key={j}>
										<button
											label={name}
											onClick={() => onChange(slug)}
											className={classnames('es-border-w-0 es-focus-slight-button-border-admin-accent es-custom-transition es-cursor-pointer es-p-2px! es-m-0', value === slug ? 'es-rounded-full!' : 'es-rounded-1.5!')}
											disabled={disabled}
											style={{
												background: 'none',
												outline: 'none',
												'--es-transition-property': 'border-radius, border, box-shadow',
												'--es-transition-duration': value === slug ? '0.6s, 0.3s, 0.3s' : '1s, 0.3s, 0.3s',
											}}
										>
											<ColorSwatch color={color} selected={value === slug} />
										</button>
									</Tooltip>
								);
							})}
						</div>
					</Control>
				);
			})}

			{filteredColors?.generic?.length > 0 &&
				<Control label={Object?.keys(filteredColors)?.length > 1 && __('Other colors', 'eightshift-frontend-libs')} additionalLabelClasses='es-mb-1.5!' noBottomSpacing>
					<div className={layoutClasses}>
						{filteredColors.generic.map(({ name, slug, color }, i) => {
							return (
								<Tooltip text={name} key={i}>
									<button
										label={name}
										onClick={() => onChange(slug)}
										className={classnames('es-border-w-0 es-focus-slight-button-border-admin-accent es-custom-transition es-cursor-pointer es-m-0 es-p-2px!', detailView && 'es-w-max es-h-spaced', value === slug && !detailView ? 'es-rounded-full!' : 'es-rounded-1.5!')}
										disabled={disabled}
										style={{
											background: 'none',
											outline: 'none',
											'--es-transition-property': 'border-radius, border, box-shadow',
											'--es-transition-duration': value === slug ? '0.6s, 0.3s, 0.3s' : '1s, 0.3s, 0.3s',
										}}
									>
										<ColorSwatch color={color} selected={value === slug} />

										{detailView && name}
									</button>
								</Tooltip>
							);
						})}
					</div>
				</Control>
			}

			{clearable &&
				<div className='es-mt-3 es-h-end'>
					<Button
						label={__('Reset', 'eightshift-frontend-libs')}
						onClick={() => onChange(undefined)}
						className={classnames('es-slight-button-border-cool-gray-400 es-rounded-1! es-transition es-px-2.5! es-py-2! es-h-auto!', (disabled || !value) ? 'es-pointer-events-none': 'es-hover-slight-button-border-cool-gray-500')}
						disabled={disabled || !value}
						showTooltip
					>
						{__('Clear', 'eightshift-frontend-libs')}
					</Button>
				</div>
			}
		</Control>
	);
};
