import React from 'react';
import { __ } from '@wordpress/i18n';
import { Fragment, useState } from '@wordpress/element';
import { BaseControl, Button } from '@wordpress/components';
import { icons } from '@eightshift/frontend-libs/scripts/editor';

export const Responsive = (props) => {
	const {
		label,
		tooltip = __('Responsive overrides', 'eightshift-frontend-libs'),
		children = [],
	} = props;

	const [isOpen, setIsOpen] = useState(false);

	const responsiveClass = [
		'es-responsive',
		isOpen ? 'is-open' : '',
	]

	return (
		<BaseControl
			className={responsiveClass.join(' ')}
			label={
				<>
					{label}
					<Button
						isSecondary
						isLarge
						label={tooltip}
						isPressed={isOpen}
						icon={icons.responsiveOverrides}
						onClick={() => setIsOpen(!isOpen)}
					/>
				</>
			}
		>
			{children.map((item, index) => {
				return (
					<Fragment key={index}>
						{!isOpen ?
							<Fragment>
								{index === 0 &&
									<Fragment key={index}>{item}</Fragment>
								}
							</Fragment> :
							<Fragment key={index}>{item}</Fragment>
						}
					</Fragment>
				);
			})}
		</BaseControl>
	);
};
