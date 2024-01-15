import React, { useState, useRef } from 'react';
import { Popover } from '@wordpress/components';

/**
 * @typedef {'top' | 'top left' | 'top right' | 'middle' | 'middle left' | 'middle right' | 'bottom' | 'bottom left' | 'bottom right'} AppearOrigin
 *
 * @param {object} props                                      - PopoverWithTrigger options.
 * @param {string?} [props.popoverClass]                      - Class applied to the main (outer) popover.
 * @param {string?} [props.contentClass='es-popover-content'] - Class applied to inner popover content.
 * @param {AppearOrigin} [props.position='top center']        - Position where the popover appears.
 * @param {boolean?} [props.noArrow=false]                    - If `true`, the popover doesn't render an arrow pointing to the trigger element.
 * @param {React.Component} props.trigger                     - Trigger element. *Needs to return a React component!* `{ ref, setIsOpen, isOpen }` is passed as props. Use `setIsOpen(true)` to open the modal. Attach the `ref` to some place inside the trigger to make sure the positioning is correct.
 * @param {React.Component?} props.children                   - Popover contents.
 * @param {function?} [props.additionalCloseActions]          - If provided, will be run before the popover closes.
 * @param {boolean} [props.allowCloseFromChildren=false]      - If `true`, child items are injected with a `popoverClose` prop that closes the popover when called.
 * @returns
 */
export const PopoverWithTrigger = (props) => {
	const {
		popoverClass,
		contentClass = 'es-popover-content',
		position = 'top center',

		noArrow = false,

		trigger,
		children,

		additionalCloseActions,

		allowCloseFromChildren = false,
	} = props;

	const ref = useRef();

	const [isOpen, setIsOpen] = useState(false);

	// Recursively processes child items to inject the closing prop or onClick handler.
	const processChildItems = (rawItems) => {
		let items = rawItems;

		// If it's a single child, place it in array, so the processing is unified.
		if (!Array.isArray(rawItems)) {
			items = [rawItems];
		}

		const processed = items.filter(Boolean).map((child) => {
			// If current child is not an object, bailout.
			if (typeof child !== 'object') {
				return child;
			}

			// If current child doesn't have 'props', bailout.
			if (!('props' in child)) {
				return child;
			}

			let newChildren = child?.props?.children;

			// If children are an array, process them as well.
			if (Array.isArray(child?.props?.children)) {
				newChildren = processChildItems(child.props.children);
			}

			// If 'esClosesModalOnClick' is set, override the onClick listener.
			if (Object.keys(child.props).includes('esClosesModalOnClick')) {
				return ({
					...child,
					props: {
						...child.props,
						children: newChildren,
						onClick: (e) => {
							setIsOpen(false);

							if ('props' in child) {
								if ('onClick' in child.props) {
									child.props.onClick(e);
								}
							}
						}
					}
				});
			}

			// Otherwise, inject the 'popoverClose' function.
			return ({
				...child,
				props: {
					...child.props,
					children: newChildren,
					popoverClose: () => setIsOpen(false)
				}
			});
		});

		if (!Array.isArray(rawItems)) {
			return processed[0];
		}

		return processed;
	};

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
					className={popoverClass}
				>
					<div className={contentClass}>
						{!allowCloseFromChildren && children}

						{allowCloseFromChildren && processChildItems(children)}
					</div>
				</Popover>
			}

			{trigger({ ref, setIsOpen, isOpen })}
		</>
	);
};
