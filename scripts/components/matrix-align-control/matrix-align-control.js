import React from 'react';
import { MatrixAlign } from '@eightshift/ui-components';

/**
 * @deprecated Use `MatrixAlign` from `@eightshift/ui-components` instead.
 *
 * A component that can provide a 3x3 or a 2x2 grid of positions to pick from.
 * Replaces the default Gutenberg `AlignmentMatrixControl`/`BlockAlignmentMatrixControl`/`BlockAlignmentMatrixToolbar`.
 *
 * @typedef {'top' | 'top left' | 'top right' | 'middle' | 'middle left' | 'middle right' | 'bottom' | 'bottom left' | 'bottom right'} AppearOrigin
 *
 * @param {object} props                                      - MatrixAlignControl options.
 * @param {'3x3'|'2x2'} [props.size='3x3']                    - Defines the matrix size to show. Can be either `3x3` or `2x2`.
 * @param {React.Component?} [props.label]                    - Label displayed on the trigger button. (tooltip when style is `wp`, text label below icon when style is `tileButton`)
 * @param {string} props.value                                - Current value.
 * @param {function} [props.onChange]                         - Function that is called on every value change.
 * @param {React.Component?} [props.icon]                     - Icon to show next to the label
 * @param {React.Component?} [props.subtitle]                 - Subtitle below the label.
 * @param {AppearOrigin} [props.popoverPosition='top center'] - Position where the popover appears.
 */
export const MatrixAlignControl = (props) => {
	const {
		size = '3x3',
		label = __('Position', 'eightshift-frontend-libs'),

		value,
		onChange,

		icon,
		subtitle,

		popoverPosition,
	} = props;

	return (
		<MatrixAlign
			size={size}
			label={label}
			value={value}
			onChange={onChange}
			icon={icon}
			subtitle={subtitle}
			popoverPosition={popoverPosition}
		/>
	);
};
