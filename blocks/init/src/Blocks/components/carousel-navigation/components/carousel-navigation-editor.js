import React from 'react'; // eslint-disable-line no-unused-vars
import classnames from 'classnames';
import { Fragment } from '@wordpress/element';

export const CarouselNavigationEditor = (attributes) => {
	const {
		componentClass = 'carousel-navigation',
		selectorClass = componentClass,
		blockClass,
		jsPrevClass,
		jsNextClass,
		theme = 'default',
	} = attributes;

	const navigationlass = classnames(
		componentClass,
		theme ? `${componentClass}__theme--${theme}` : '',
		blockClass && `${blockClass}__${selectorClass}`,
	);

	const prevClass = classnames(
		`${componentClass}__item`,
		`${componentClass}__item--prev`,
		jsPrevClass
	);

	const nextClass = classnames(
		`${componentClass}__item`,
		`${componentClass}__item--next`,
		jsNextClass
	);

	const iconClass = classnames(`${componentClass}__icon`);

	return (
		<Fragment>
			<div className={navigationlass}>
				<div className={prevClass}>
					<svg className={iconClass} width="22" height="40" xmlns="http://www.w3.org/2000/svg">
						<g style="mix-blend-mode:multiply" stroke="#FFF" fill="none" fillRule="evenodd" strokeLinecap="round">
							<path d="M1 20L21 1M21 39L1 20" />
						</g>
					</svg>
				</div>
				<div className={nextClass}>
					<svg className={iconClass} width="22" height="40" xmlns="http://www.w3.org/2000/svg">
						<g style="mix-blend-mode:multiply" stroke="#FFF" fill="none" fillRule="evenodd" strokeLinecap="round">
							<path d="M21 20L1 1M1 39l20-19" />
						</g>
					</svg>
				</div>
			</div>
		</Fragment>
	);
};
