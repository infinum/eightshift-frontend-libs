import React from 'react'; // eslint-disable-line no-unused-vars
import { Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import classnames from 'classnames';

export const ScrollToTopEditor = (props) => {
	const {
		content = __('To Top', 'eightshift-boilerplate'),
		componentClass = 'scroll-to-top',
		blockClass,
		use = true,
	} = props;

	const scrollClass = classnames(
		componentClass,
		blockClass && `${blockClass}__${componentClass}`,
	);

	return (
		<Fragment>
			{use &&
				<button className={scrollClass}>
					{content}
				</button>
			}
		</Fragment>
	);
};
