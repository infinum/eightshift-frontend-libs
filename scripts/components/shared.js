import React, { useState, useRef, forwardRef } from 'react';
import { classnames } from '../helpers';
import { IconLabel } from './icon-label/icon-label';
import { Animate, Popover, Button } from '@wordpress/components';

/**
 * @since 8.0.0
 *
 * A base component to optionally encase a component with a label and help.
 *
 * @param {object} props                           - Control options.
 * @param {React.Component?} [props.icon]          - Icon to show next to the label
 * @param {React.Component?} [props.label]         - Label to show above component.
 * @param {React.Component?} [props.subtitle]      - Subtitle below the label.
 * @param {React.Component?} [props.actions]       - Actions to show to the right of the label.
 * @param {React.Component?} [props.help]          - Help to show below the control.
 * @param {React.Component?} [props.children]      - Content to show.
 * @param {string?} [props.additionalClasses]      - Classes to add to the control base.
 * @param {boolean?} [props.noBottomSpacing=false] - If `true`, space below the control is removed.
 */
export const Control = (props) => {
	const {
		icon,
		label,
		subtitle,

		actions,

		help,

		children,

		additionalClasses,

		noBottomSpacing = false,
	} = props;

	if (!children) {
		return null;
	}

	return (
		<div className={classnames(additionalClasses, !noBottomSpacing && 'es-mb-5')}>
			{label &&
				<div className={classnames('es-mb-2 es-min-h-7', actions && 'es-h-between')}>
					<IconLabel icon={icon} label={label} subtitle={subtitle} standalone />

					{actions}
				</div>
			}

			{children}

			{help &&
				<div className='es-mt-1 es-text-3 es-color-cool-gray-500'>{help}</div>
			}
		</div>
	);
};

/**
 * @since 8.0.0
 *
 * A wrapper around the Gutenberg Animate component.
 *
 * @param {object} props                               - AnimatedContentVisibility options.
 * @param {boolean} [props.showIf]                     - When to show the content.
 * @param {string?} [props.animation='slide-in']       - Animation to use.
 * @param {string?} [props.direction='bottom']         - Animation direction.
 * @param {string?} [props.additionalContainerClasses] - Classes to add to the animated container.
 * @param {React.Component?} [props.children]          - Content to show.
 */
export const AnimatedContentVisibility = (props) => {
	const {
		showIf,

		animation = 'slide-in',
		direction = 'bottom',

		additionalContainerClasses,

		children,
	} = props;

	if (!showIf) {
		return null;
	}

	return (
		<Animate type={animation} options={{ origin: direction }} >
			{({ className }) => (
				<div className={classnames(className, additionalContainerClasses)}>
					{children}
				</div>
			)}
		</Animate>
	);
};

/**
 * @typedef {'top' | 'top left' | 'top right' | 'middle' | 'middle left' | 'middle right' | 'bottom' | 'bottom left' | 'bottom right'} AppearOrigin
 *
 * @param {object} props                                      - PopoverWithTrigger options.
 * @param {string?} [props.contentClass='es-popover-content'] - Class applied to inner popover content.
 * @param {AppearOrigin} [props.popoverPosition='top center'] - Position where the popover appears.
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
	} = props;

	const [isOpen, setIsOpen] = useState(false);
	const ref = useRef();

	return (
		<>
			{isOpen &&
				<Popover
					onClose={() => {
						props?.additionalCloseActions();
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

/**
 * Button with an icon and text below it.
 *
 * @param {object} props TileButton props.
 * @param {React.Component} props.icon       - Icon shown on the button.
 * @param {React.Component} props.label      - Label shown below the icon.
 * @param {callback} [props.onClick]         - Click action.
 * @param {boolean} [props.isPressed=false]  - If `true`, the button renders as pressed.
 * @param {string} [props.additionalClasses] - Classes passed to the button.
 */
export const TileButton = forwardRef((props, ref) => {
	const {
		icon,
		label,

		onClick,
		isPressed = false,

		additionalClasses,
	} = props;

	return (
		<Button
			{...props}
			ref={ref}
			icon={icon}
			onClick={onClick}
			isPressed={isPressed}
			className={classnames('es-button-icon-24 es-slight-button-border-cool-gray-300 es-hover-slight-button-border-cool-gray-500 es-flex-grow-0 es-flex-shrink-0 es-rounded-1! es-has-v2-gutenberg-button-active-state es-flex-col es-gap-1.25! es-w-17! es-h-17! es-button-no-icon-spacing es-content-center! es-text-3! es-line-h-0.95 es-p-0.75! es-nested-flex-shrink-0', additionalClasses)}
		>
			<span className='es-h-6 es-v-center'>{label}</span>
		</Button>
	);
});
