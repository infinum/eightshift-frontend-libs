import React from 'react'; // eslint-disable-line no-unused-vars
import { Fragment } from '@wordpress/element';
import classnames from 'classnames';

export const CopyrightEditor = (props) => {
	const {
		blockClass,
		componentClass = 'carousel-pagination',
		by = 'Infinum',
		year = '2020',
		use = true,
	} = props;

	const copyClass = classnames(
		componentClass,
		blockClass && `${blockClass}__${componentClass}`,
	);

	return (
		<Fragment>
			{use &&
				<div className={copyClass}>
					{'&copy'} {by} {year}
				</div>
			}
		</Fragment>
	);
};
