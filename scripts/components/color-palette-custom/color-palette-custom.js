import React, { useState } from 'react';
import { __ } from '@wordpress/i18n';
import { BaseControl, Button, TextControl } from '@wordpress/components';
import { icons } from '../../../scripts';
import classnames from 'classnames';
import { select } from '@wordpress/data';
import { STORE_NAME } from './../../editor/store';

/**
 * Determines the color picker layout.
 * 
 * - `DEFAULT` - colors are shown as circles without labels, each one has a tooltip.
 * - `LIST` - colors as shown as a single-column list with color names visible.
 * - `LIST_TWO_COL` - colors as shown as a two-column list with color names visible.
 */
export const ColorPaletteCustomLayout = {
	DEFAULT: 'default',
	LIST: 'list',
	LIST_TWO_COL: 'list-two-col',
};

/**
 * Modified version of WordPress's `ColorPalette` which saves values as color names/slugs instead of hex codes.
 * 
 * @param {object} props                                                             - ColorPaletteCustom options.
 * @param {array} props.colors                                                       - Colors to display.
 * @param {object} props.value                                                       - Current value.
 * @param {function} props.onChange                                                  - Function called when the value is modified.
 * @param {boolean} [props.clearable=false]                                          - If `true`, the color palette will have a *Clear* button.
 * @param {string?} [props.label]                                                    - Label displayed above the picker.
 * @param {string?} [props.help]                                                     - Help text displayed below the picker.
 * @param {string?} [props.inline=false]                                             - If `true` and a `label` or `help` is provided, removes the default bottom spacing from WP `BaseControl`.
 * @param {string?} [props.layout='']                                                - If `true` and a `label` or `help` is provided, removes the default bottom spacing from WP `BaseControl`.
 * @param {ColorPaletteCustomLayout} [props.layout=ColorPaletteCustomLayout.DEFAULT] - Determines the layout of the control.
 * @param {boolean} [props.searchable=false]                                         - If `true`, the list of color can be searched through.
 * @param {boolean} [props.disabled]                                                 - If `true`, the component can't be interacted with.
 * @param {boolean} [props.groupShades=true]                                         - If `true`, color swatches will be grouped if there are 2 or more colors with the same beginning of the name, but different ending (-50, -100, ..., -900).
 */
export const ColorPaletteCustom = (props) => {
	const {
		colors = select(STORE_NAME).getSettings().globalVariables.colors,
		value,
		onChange,
		clearable = false,
		label,
		help,
		inline = false,
		layout = ColorPaletteCustomLayout.DEFAULT,
		searchable = false,
		disabled,
		groupShades = true,
	} = props;

	const colorSuffixRegex = /(?!^.+)(-?(?:50|100|200|300|400|500|600|700|800|900){1})$/gi;

	let groupedColors = {generic: colors};

	if (groupShades) {
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

	const detailView = layout === ColorPaletteCustomLayout.LIST || layout === ColorPaletteCustomLayout.LIST_TWO_COL;

	const searchEmptyIcon = React.cloneElement(icons.searchEmpty, {className: 'es-w-xl es-h-xl es-has-wp-admin-theme-color'});

	const control = (
		<>
			{searchable &&
				<TextControl
					disabled={disabled}
					placeholder={__('Search colors', 'eightshift-frontend-libs')}
					className='es-mb-s-important'
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
					<span>{__('No matches for', 'eightshift-frontend-libs')} <i>{searchTerm}</i></span>
				</div>
			}

			{Object.entries(filteredColors).map(([groupName, groupColors], i) => {
				const isOtherColors = groupName === 'generic';

				if (groupColors?.length === 0) {
					return null;
				}

				return (
					<div className='es-h-between-wrap es-mb-s' key={i}>
						{!isOtherColors && <p className='es-mt-0 es-mb-0'>{groupName}</p>}

						{!isOtherColors &&
							<div className='es-color-theme-container'>
								{groupColors.map(({ name, slug, color }, j) => {
									return (
										<Button
											key={j}
											label={name}
											onClick={() => onChange(slug)}
											className={`es-button-icon-26 es-button-square-28 ${value === slug ? 'is-generic-swatch-active' : ''}`}
											icon={icons.genericColorSwatch}
											disabled={disabled}
											style={{
												'--selected-color': slug === 'transparent' ? 'transparent' : color,
												'--current-opacity': value === slug ? 1 : 0,
												'--checkerboard-opacity': slug === 'transparent' ? 1 : 0,
											}}
										/>
									);
								})}
							</div>
						}
					</div>
				);
			})}

			{filteredColors?.generic?.length > 0 &&
				<BaseControl label={Object?.keys(filteredColors)?.length > 1 ? __('Other colors', 'eightshift-frontend-libs') : null}>
					<div className={classnames([
						layout === ColorPaletteCustomLayout.DEFAULT ? 'es-color-palette-custom--inline' : '',
						layout === ColorPaletteCustomLayout.LIST ? 'es-color-palette-custom--list' : '',
						layout === ColorPaletteCustomLayout.LIST_TWO_COL ? 'es-color-palette-custom--list-two-col' : '',
					])}>
						{filteredColors.generic.map(({ name, slug, color }, i) => {
							return (
								<Button
									key={i}
									label={name}
									onClick={() => onChange(slug)}
									className={`es-button-icon-26 ${layout === ColorPaletteCustomLayout.DEFAULT ? 'es-button-square-28' : ''} ${value === slug ? 'is-generic-swatch-active' : ''}`}
									icon={icons.genericColorSwatch}
									disabled={disabled}
									style={{
										'--selected-color': slug === 'transparent' ? 'transparent' : color,
										'--current-opacity': value === slug ? 1 : 0,
										'--checkerboard-opacity': slug === 'transparent' ? 1 : 0,
									}}
								>
									{detailView && name}
								</Button>
							);
						})}
					</div>
				</BaseControl>
			}

			{clearable &&
				<Button
					label={__('Reset', 'eightshift-frontend-libs')}
					onClick={() => onChange(undefined)}
					icon={icons.reset}
					className='es-mt-m es-button-icon-24'
					disabled={disabled}
				>
					{__('Reset', 'eightshift-frontend-libs')}
				</Button>
			}
		</>
	);

	if (!label && !help) {
		return control;
	}

	return (
		<BaseControl label={label} help={help} className={inline ? 'es-no-field-spacing' : ''}>
			{control}
		</BaseControl>
	);
};
