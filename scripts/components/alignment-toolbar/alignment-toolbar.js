import React from 'react';
import { __ } from '@wordpress/i18n';
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
}

/**
 * Component that allows flexible text or object alignment options display.
 * 
 * @param {object} props                                  - AlignmentToolbar options.
 * @param {string} [props.type=AlignmentToolbarType.TEXT] - Alignment toolbar type.
 * @param {array} props.options                           - Alignment options to display. Can any combination be `left`, `center`, `right`, `justify` (text align) / `stretch` (object align).
 * @param {function} props.onChange                       - Callback that applies the changes.
 * @param {string} props.value                            - Current value.
 * @param {React.Component?} props.label                  - Tooltip of the picker button (if not shown inline).
 * @param {boolean} [props.showInline=false]              - If `true`, the controls are displayed inline instead of a dropdown button.
 */
export const AlignmentToolbar = (props) => {
	const {
		type = AlignmentToolbarType.TEXT,
		options = ['left', 'center', 'right', 'justify', 'stretch'],
		onChange,
		value,
		label,
		showInline = false,
	} = props;

	const showAlignStart = options.includes('left');
	const showAlignCenter = options.includes('center');
	const showAlignEnd = options.includes('right');
	const showAlignJustify =  options.includes('justify');
	const showAlignStretch =  options.includes('stretch');

	const textAligns = {
		left: showAlignStart ? {
			icon: icons.textAlignLeft,
			title: __('Align text left'),
			value: 'left',
		} : null,
		center: showAlignCenter ? {
			icon: icons.textAlignCenter,
			title: __('Align text center'),
			value: 'center',
		} : null,
		right: showAlignEnd ? {
			icon: icons.textAlignCenter,
			title: __('Align text right'),
			value: 'right',
		} : null,
		justify: showAlignJustify ? {
			icon: icons.textAlignJustify,
			title: __('Justify text'),
			value: 'justify',
		} : null
	}
	
	const horizontalAligns = {
		left: showAlignStart ? {
			icon: icons.horizontalAlignLeft,
			title: __('Align left'),
			value: 'left',
		} : null,
		center: showAlignCenter ? {
			icon: icons.horizontalAlignCenter,
			title: __('Align center'),
			value: 'center',
		} : null,
		right: showAlignEnd ? {
			icon: icons.horizontalAlignRight,
			title: __('Align right'),
			value: 'right',
		} : null,
		stretch: showAlignStretch ? {
			icon: icons.horizontalAlignStretch,
			title: __('Stretch'),
			value: 'stretch',
		} : null
	}

	const verticalAligns = {
		left: showAlignStart ? {
			icon: icons.verticalAlignLeft,
			title: __('Align left'),
			value: 'left',
		} : null,
		center: showAlignCenter ? {
			icon: icons.verticalAlignCenter,
			title: __('Align center'),
			value: 'center',
		} : null,
		right: showAlignEnd ? {
			icon: icons.verticalAlignRight,
			title: __('Align right'),
			value: 'right',
		} : null,
		stretch: showAlignStretch ? {
			icon: icons.verticalAlignStretch,
			value: __('Stretch'),
			align: 'stretch',
		} : null
	}
	
	const getControls = () => {
		switch (type) {
			case AlignmentToolbarType.VERTICAL:
				return verticalAligns;
			case AlignmentToolbarType.HORIZONTAL:
				return horizontalAligns;
			default:
				return textAligns;
		}
	}

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
		/>
	)
}
