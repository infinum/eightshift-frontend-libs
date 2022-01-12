import React from 'react';
import { __, sprintf } from '@wordpress/i18n';
import { icons } from '@eightshift/frontend-libs/scripts/editor';
import { OptionPicker } from '@eightshift/frontend-libs/scripts/components';

/**
 * Alignment toolbar type.
 * 
 * Can be:
 * - `TEXT` - for text align controls.
 * - `VERTICAL` - for object vertical align controls.
 * - `HORIZONTAL` - for object horizontal align controls.
 */
export const AlignmentToolbarType = {
	TEXT: 'text',
	VERTICAL: 'vertical',
	HORIZONTAL: 'horizontal'
};

/**
 * Component that allows flexible text or object alignment options display.
 * 
 * @param {object} props                                  - AlignmentToolbar options.
 * @param {string} [props.type=AlignmentToolbarType.TEXT] - Alignment toolbar type.
 * @param {array} props.options                           - Alignment options to display. Can any combination be `left`, `center`, `right`, `justify` (text align) / `stretch` (object align).
 * @param {function} props.onChange                       - Callback that applies the changes.
 * @param {string} props.value                            - Current value.
 * @param {React.Component?} props.label                  - Tooltip of the picker button (if not shown inline).
 * @param {string} props.title                            - Component/block name.
 * @param {boolean} [props.showInline=false]              - If `true`, the controls are displayed inline instead of a dropdown button.
 * @param {boolean} [props.disabled=false]                - If `true`, control is disabled.
 */
export const AlignmentToolbar = (props) => {
	const {
		type = AlignmentToolbarType.TEXT,
		options = ['left', 'center', 'right', 'justify', 'stretch'],
		onChange,
		value,
		label,
		title = type === AlignmentToolbarType.TEXT ? __('text', 'eightshift-frontend-libs') : __('items', 'eightshift-frontend-libs'),
		showInline = false,
		disabled = false,
	} = props;

	const showAlignStart = options.includes('left');
	const showAlignCenter = options.includes('center');
	const showAlignEnd = options.includes('right');
	const showAlignJustify = options.includes('justify');
	const showAlignStretch = options.includes('stretch');

	const textAligns = {
		left: showAlignStart ? {
			icon: icons.textAlignLeft,
			title: sprintf(__('Align %s left', 'eightshift-frontend-libs'), title),
			value: 'left',
		} : null,
		center: showAlignCenter ? {
			icon: icons.textAlignCenter,
			title: sprintf(__('Align %s center', 'eightshift-frontend-libs'), title),
			value: 'center',
		} : null,
		right: showAlignEnd ? {
			icon: icons.textAlignRight,
			title: sprintf(__('Align %s right', 'eightshift-frontend-libs'), title),
			value: 'right',
		} : null,
		justify: showAlignJustify ? {
			icon: icons.textAlignJustify,
			title: sprintf(__('Justify %s', 'eightshift-frontend-libs'), title),
			value: 'justify',
		} : null
	};

	const horizontalAligns = {
		left: showAlignStart ? {
			icon: icons.horizontalAlignLeft,
			title: sprintf(__('Align %s left', 'eightshift-frontend-libs'), title),
			value: 'left',
		} : null,
		center: showAlignCenter ? {
			icon: icons.horizontalAlignCenter,
			title: sprintf(__('Align %s center', 'eightshift-frontend-libs'), title),
			value: 'center',
		} : null,
		right: showAlignEnd ? {
			icon: icons.horizontalAlignRight,
			title: sprintf(__('Align %s right', 'eightshift-frontend-libs'), title),
			value: 'right',
		} : null,
		stretch: showAlignStretch ? {
			icon: icons.horizontalAlignStretch,
			title: sprintf(__('Stretch %s', 'eightshift-frontend-libs'), title),
			value: 'stretch',
		} : null
	};

	const verticalAligns = {
		left: showAlignStart ? {
			icon: icons.verticalAlignLeft,
			title: sprintf(__('Align %s top', 'eightshift-frontend-libs'), title),
			value: 'left',
		} : null,
		center: showAlignCenter ? {
			icon: icons.verticalAlignCenter,
			title: sprintf(__('Align %s middle', 'eightshift-frontend-libs'), title),
			value: 'center',
		} : null,
		right: showAlignEnd ? {
			icon: icons.verticalAlignRight,
			title: sprintf(__('Align %s bottom', 'eightshift-frontend-libs'), title),
			value: 'right',
		} : null,
		stretch: showAlignStretch ? {
			icon: icons.verticalAlignStretch,
			value: sprintf(__('Stretch %s', 'eightshift-frontend-libs'), title),
			align: 'stretch',
		} : null
	};

	const getControls = () => {
		switch (type) {
			case AlignmentToolbarType.VERTICAL:
				return verticalAligns;
			case AlignmentToolbarType.HORIZONTAL:
				return horizontalAligns;
			default:
				return textAligns;
		}
	};

	const filteredControls = Object.values(getControls()).filter((control) => control !== null);

	return (
		<OptionPicker
			value={value}
			onChange={onChange}
			options={filteredControls}
			label={label}
			isInline={showInline}
			isToolbarButton
			isInToolbar
			disabled={disabled}
		/>
	);
};
