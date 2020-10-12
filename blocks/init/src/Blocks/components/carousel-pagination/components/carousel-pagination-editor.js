import React from 'react'; // eslint-disable-line no-unused-vars
import { Fragment } from '@wordpress/element';
import classnames from 'classnames';

export const CarouselPaginationEditor = (props) => {
	const {
		blockClass,
		blockJsClass,
		componentClass = 'carousel-pagination',
		use = true,
	} = props;

	const paginationClass = classnames(
		componentClass,
		blockClass && `${blockClass}__${componentClass}`,
		blockJsClass,
	);

	return (
		<Fragment>
			{use &&
				<div className={paginationClass}></div>
			}
		</Fragment>
	);
};
