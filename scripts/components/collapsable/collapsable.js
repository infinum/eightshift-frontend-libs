import React, { useState } from 'react';
import { BaseControl, Button } from '@wordpress/components';
import { icons } from '@eightshift/frontend-libs/scripts';
import classnames from 'classnames';

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

	const componentClasses = classnames([
		'es-collapsable',
		isOpen ? 'is-open' : '',
	]);

	const expanderIcon = isOpen ? icons.chevronUp : icons.chevronDown;

	return (
		<BaseControl className={componentClasses}>
			<div className='es-collapsable__trigger'>
				<Button 
					onClick={() => setIsOpen(!isOpen)}
				>
					{label}
				</Button>

				{showExpanderIcon &&
					<Button 
						onClick={() => setIsOpen(!isOpen)}
					>
						{expanderIcon}
					</Button>
				}

			</div>

			{isOpen && children}
		</BaseControl>
	);
};
