import React from 'react'; // eslint-disable-line no-unused-vars
import { Fragment, useState } from '@wordpress/element';
import { BaseControl, Button } from '@wordpress/components';
import { aspectRatio } from '@wordpress/icons';

export const Responsive = (props) => {
	const {
		label,
		children,
	} = props;

	const [isOpen, setActive] = useState(false);

	return (
		<BaseControl
			label={
				<Fragment>
					{label}
					<Button isDefault isSmall icon={aspectRatio} onClick={() => setActive(!isOpen)}></Button>
				</Fragment>
			}
			className={'custom-responsive'}
		>
			<br />
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
