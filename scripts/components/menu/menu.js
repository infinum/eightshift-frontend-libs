import React from 'react';
import { Button } from '@wordpress/components';
import { classnames } from '../../helpers';
import { PopoverWithTrigger, icons } from '../../../scripts';

/**
 * @since 8.5.0
 *
 * A simple dropdown menu.
 *
 * @param {object} props                              - Menu options.
 * @param {React.Component?} [props.icon]             - Icon to show within the menu open button.
 * @param {(string|React.Component)?} [props.label]   - Label to show inside the menu open button.
 * @param {(string|React.Component)?} [props.tooltip] - Tooltip to show on the menu open button.
 * @param {boolean?} [props.disabled=false]           - If `true`, the menu open button is disabled.
 * @param {string?} [props.buttonClass]               - Replace the menu open default class.
 * @param {string?} [props.additionalClass]           - Pass custom class(es) to the menu open button.
 * @param {object?} [props.buttonProps]               - Pass custom props to the menu open button.
 * @param {boolean?} [props.isSubmenu=false]          - If `true`, the styling of the menu toggle matches the styling of `MenuItem`s.
 * @param {object?} [props.popoverProps]              - Pass custom props to the popover that contains the menu items.
 * @param {string?} [props.popoverAdditionalClass]    - Pass custom class(es) to the popover that contains the menu items.
 */
export const Menu = (props) => {
	const {
		icon,
		label,
		tooltip,

		disabled = false,

		buttonClass,
		additionalClass,

		buttonProps,

		isSubmenu = false,

		popoverProps,
		popoverAdditionalClass,

		children,
	} = props;

	let buttonClassname = classnames(
		// eslint-disable-next-line max-len
		'es-slight-button-border-cool-gray-400 es-hover-slight-button-border-admin-accent es-active-slight-button-border-admin-accent es-focus-slight-button-border-admin-accent es-nested-size-5',
		// eslint-disable-next-line max-len
		'es-nested-m-0! es-gap-1.25! es-bg-pure-white es-text-3.25! es-color-cool-gray-650 es-rounded-1.5! es-flex-shrink-0 es-min-w-auto!',
		!label && 'es-size-9',
		label && 'es-px-2.5!',
		additionalClass,
	);

	if (isSubmenu) {
		buttonClassname = classnames(
			'es-rounded-1.5 es-gap-1.5! es-transition-colors es-min-w-max! es-nested-m-0!',
			!disabled && 'es-hover-color-current! es-hover-bg-cool-gray-50 es-nested-color-cool-gray-450',
			disabled && 'es-nested-color-cool-gray-200',
			additionalClass
		);
	}

	let innerContent = label;

	if (isSubmenu) {
		innerContent = (
			<div className='es-h-between es-w-full'>
				{label}

				{icons.chevronRight}
			</div>
		);
	}

	return (
		<PopoverWithTrigger
			popoverClass={isSubmenu ? 'es-submenu-popover' : 'es-menu-popover'}
			trigger={({ ref, setIsOpen, isOpen }) => (
				<Button
					ref={ref}
					icon={icon}
					onClick={() => setIsOpen(!isOpen)}
					className={buttonClass ?? buttonClassname}
					label={tooltip}
					disabled={disabled}
					{...buttonProps}
				>
					{innerContent}
				</Button>
			)}
			contentClass={classnames('es-p-1 es-v-spaced es-gap-2px! es-min-w-48', popoverAdditionalClass)}
			position='bottom right'
			noArrow
			{...popoverProps}
		>
			{children}
		</PopoverWithTrigger>
	);
};
