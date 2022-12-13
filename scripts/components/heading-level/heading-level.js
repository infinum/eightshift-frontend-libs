import React from 'react';
import { __, sprintf } from '@wordpress/i18n';
import _ from 'lodash';
import { BlockIcon, icons, ToolbarOptionPicker } from '../../../scripts';

/**
 * A heading level selector.
 *
 * @deprecated since 8.0.0 - Use `OptionSelector` inside the block options instead.
 * @see OptionSelector
 *
 * @param {object} props                 - Heading level selector options.
 * @param {boolean} [props.inline=false] - If `true`, the control's options are shown inline.
 * @param {number} [props.minLevel=1]    - Lowest allowed level.
 * @param {number} [props.maxLevel=6]    - Highest allowed level.
 * @param {number?} props.selectedLevel  - Currently selected heading level.
 * @param {function} props.onChange      - Function called when the selection is changed.
 * @param {string} [props.title]         - Function called when the selection is changed.
 * @param {boolean} [props.disabled=false]  - If `true`, control is disabled.
 */
export const HeadingLevel = (props) => {
	const {
		inline = false,
		minLevel = 1,
		maxLevel = 6,
		selectedLevel,
		onChange,
		title = __('Heading', 'eightshift-frontend-libs'),
		disabled = false,
	} = props;

	const options = _.range(minLevel, maxLevel + 1).map((level) => {
		return {
			icon: icons[`h${level}`] ?? <BlockIcon iconName='es-heading' />,
			title: sprintf(__('Heading %d', 'eightshift-frontend-libs'), level),
			value: level
		};
	});

	return (
		<ToolbarOptionPicker
			value={selectedLevel}
			onChange={onChange}
			options={options}
			label={sprintf(__('%s level', 'eightshift-frontend-libs'), title)}
			isInline={inline}
			isToolbarButton
			isInToolbar
			disabled={disabled}
		/>
	);
};
