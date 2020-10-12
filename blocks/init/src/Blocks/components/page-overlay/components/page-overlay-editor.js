import React from 'react'; // eslint-disable-line no-unused-vars
import classnames from 'classnames';
import { Fragment } from '@wordpress/element';

export const PageOverlayEditor = (props) => {
	const {
		componentClass = 'page-overlay',
		blockClass,
		use = true,
	} = props;

	const overlayClass = classnames(
		componentClass,
		blockClass && `${blockClass}__${componentClass}`,
	);

	return (
		<Fragment>
			{use &&
				<div className={overlayClass}></div>
			}
		</Fragment>
	);
};
