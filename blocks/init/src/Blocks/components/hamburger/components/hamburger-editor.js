import React from 'react'; // eslint-disable-line no-unused-vars
import classnames from 'classnames';

export const HamburgerEditor = (props) => {
	const {
		blockClass,
		componentClass = 'hamburger',
	} = props;

	const hamburgerClass = classnames(
		componentClass,
		`js-${componentClass}`,
		blockClass && `${blockClass}__${componentClass}`,
	);

	return (
		<button className={hamburgerClass}>
			<span className={`${componentClass}__wrapper`}>
				<span className={`${componentClass}__line ${componentClass}__line--1`}></span>
				<span className={`${componentClass}__line ${componentClass}__line--2`}></span>
				<span className={`${componentClass}__line ${componentClass}__line--3`}></span>
			</span>
		</button>
	);
};
