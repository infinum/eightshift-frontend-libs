import React, { useState } from 'react';
import { BaseControl, Button, Animate } from '@wordpress/components';
import { icons } from '../../../scripts';

/**
 * A collapsable container for options, akin to CollapsableComponentUseToggle.
 * 
 * @param {object} props                      - Collapsable options.
 * @param {string} props.label                - Trigger label.
 * @param {boolean} props.startOpen           - If true, the component is expanded by default. Default: false 
 * @param {boolean} props.showExpanderIcon    - If true, the expander icon is rendered. Default: true
 * @param {React.Component} props.children    - Child items that are shown when expanded.
 * @returns 
 */
export const Collapsable = ({
	label,
	startOpen = false,
	showExpanderIcon = true,
	children,
}) => {
	const [isOpen, setIsOpen] = useState(startOpen);

	const componentClasses = [
		'es-collapsable-v2',
		isOpen ? 'is-open' : '',
	];

	return (
		<BaseControl className={componentClasses}>
			<div className='es-collapsable-v2__trigger'>
				{label}

				{showExpanderIcon &&
					<Button
						onClick={() => setIsOpen(!isOpen)}
						className='es-button-icon-24 es-button-square-32 es-justify-content-center es-align-items-center'
					>
						{icons.caretDown}
					</Button>
				}
			</div>

			{isOpen &&
				<Animate type='slide-in' options={{ origin: 'bottom' }} >
					{({ className }) => (
						<div className={className}>
							{children}
						</div>
					)}
				</Animate>
			}
		</BaseControl>
	);
};
