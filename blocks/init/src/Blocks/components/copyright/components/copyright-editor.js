import React from 'react'; // eslint-disable-line no-unused-vars
import classnames from 'classnames';

export const CopyrightEditor = (props) => {
	const {
		blockClass,
		componentClass = 'carousel-pagination',
		by = 'Infinum',
		year = '2020',
	} = props;

	const copyClass = classnames(
		componentClass,
		blockClass && `${blockClass}__${componentClass}`,
	);

	return (
		<div className={copyClass}>
			{'&copy'} {by} {year}
		</div>
	);
};
