import React from 'react'; // eslint-disable-line no-unused-vars
import classnames from 'classnames';

export const CarouselPaginationEditor = (props) => {
	const {
		blockClass,
		blockJsClass,
		componentClass = 'carousel-pagination',
	} = props;

	const paginationClass = classnames(
		componentClass,
		blockClass && `${blockClass}__${componentClass}`,
		blockJsClass,
	);

	return (
		<div className={paginationClass}></div>
	);
};
