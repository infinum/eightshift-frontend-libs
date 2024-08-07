import React from 'react';
import { TriggeredPopover } from '@eightshift/ui-components';

/**
 * @deprecated Use `TriggeredPopover` from `@eightshift/ui-components` instead.
 *
 * @typedef {'top' | 'top left' | 'top right' | 'middle' | 'middle left' | 'middle right' | 'bottom' | 'bottom left' | 'bottom right'} AppearOrigin
 *
 * @param {object} props                                      - PopoverWithTrigger options.
 * @param {string?} [props.popoverClass]                      - Class applied to the main (outer) popover.
 * @param {AppearOrigin} [props.position='top center']        - Position where the popover appears.
 * @param {React.Component?} props.children                   - Popover contents.
 * @param {function?} [props.additionalCloseActions]          - If provided, will be run before the popover closes.
 * @param {object?} [props.additionalPopoverProps]            - If passed, the props are passed to the Popover component.
 * @returns
 */
export const PopoverWithTrigger = (props) => {
	const {
		popoverClass,
		position = 'top center',

		children,

		additionalCloseActions,

		additionalPopoverProps,
	} = props;

	return (
		<TriggeredPopover
			className={popoverClass}
			placement={position}
			onOpenChange={(closed) => {
				if (closed) {
					additionalCloseActions();
				}
			}}
			{...additionalPopoverProps}
		>
			{children}
		</TriggeredPopover>
	);
};
