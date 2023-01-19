import React, { useState, useRef } from 'react';
import { Popover } from '@wordpress/components';

/**
 * @typedef {'top' | 'top left' | 'top right' | 'middle' | 'middle left' | 'middle right' | 'bottom' | 'bottom left' | 'bottom right'} AppearOrigin
 *
 * @param {object} props                                      - PopoverWithTrigger options.
 * @param {string?} [props.contentClass='es-popover-content'] - Class applied to inner popover content.
 * @param {AppearOrigin} [props.position='top center']        - Position where the popover appears.
 * @param {boolean?} [props.noArrow=false]                    - If `true`, the popover doesn't render an arrow pointing to the trigger element.
 * @param {React.Component} props.trigger                     - Trigger element. *Needs to return a React component!* `{ ref, setIsOpen, isOpen }` is passed as props. Use `setIsOpen(true)` to open the modal. Attach the `ref` to some place inside the trigger to make sure the positioning is correct.
 * @param {React.Component?} props.children                   - Popover contents.
 * @param {function?} [props.additionalCloseActions]          - If provided, will be run before the popover closes.
 * @returns
 */
export const PopoverWithTrigger = (props) => {
	const {
		contentClass = 'es-popover-content',
		position = 'top center',

		noArrow = false,

		trigger,
		children,

		additionalCloseActions,
	} = props;

	const ref = useRef();

	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			{isOpen &&
				<Popover
					onClose={() => {
						if (additionalCloseActions) {
							additionalCloseActions();
						}

						setIsOpen(false);
					}}
					anchor={ref?.current}
					noArrow={noArrow}
					position={position}
				>
					<div className={contentClass}>
						{children}
					</div>
				</Popover>
			}

			{trigger({ ref, setIsOpen, isOpen })}
		</>
	);
};
