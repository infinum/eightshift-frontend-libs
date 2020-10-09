import React from 'react'; // eslint-disable-line no-unused-vars
import classnames from 'classnames';

export const FooterEditor = (props) => {
	const {
		blockClass,
		componentClass = 'footer',
		left,
		center,
		right,
	} = props;

	const footerClass = classnames(
		componentClass,
		blockClass && `${blockClass}__${componentClass}`,
	);

	return (
		<footer className={footerClass}>
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
		</footer>
	);
};
