import React from 'react'; // eslint-disable-line no-unused-vars
import { Fragment } from '@wordpress/element';
import classnames from 'classnames';

export const HeaderEditor = (props) => {
	const {
		blockClass,
		componentClass = 'header',
		left,
		center,
		right,
		use = true,
	} = props;

	const headerClass = classnames(
		componentClass,
		blockClass && `${blockClass}__${componentClass}`,
	);

	return (
		<Fragment>
			{use &&
				<header className={headerClass}>
					<div className={`${componentClass}__wrapper`}>
						<div className={`${componentClass}__column ${componentClass}__column--left`}>
							{left}
						</div>
						<div className={`${componentClass}__column {componentClass}__column--center`}>
							{center}
						</div>
						<div className={`${componentClass}__column {componentClass}__column--right`}>
							{right}
						</div>
					</div>
				</header>
			}
		</Fragment>
	);
};
