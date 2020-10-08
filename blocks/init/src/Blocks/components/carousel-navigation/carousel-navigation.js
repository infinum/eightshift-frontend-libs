import React from 'react'; // eslint-disable-line no-unused-vars
import classnames from 'classnames';
import { Fragment } from '@wordpress/element';

export const CarouselNavigation = (props) => {
	const {
		blockJsPrevClass,
		blockJsNextClass,
		blockClass,
		componentClass = 'carousel-navigation',
	} = props;

	const arrowItemPrevClass = classnames(
		`${componentClass}__arrow-item`,
		`${componentClass}__arrow-item--prev`,
		blockClass ? `${blockClass}__carousel-navigation-arrow-item` : '',
		blockClass ? `${blockClass}__carousel-navigation-arrow-item--prev` : '',
		blockJsPrevClass
	);

	const arrowItemNextClass = classnames(
		`${componentClass}__arrow-item`,
		`${componentClass}__arrow-item--next`,
		blockClass ? `${blockClass}__carousel-navigation-arrow-item` : '',
		blockClass ? `${blockClass}__carousel-navigation-arrow-item--next` : '',
		blockJsNextClass
	);

	const arrowIconClass = classnames(
		`${componentClass}__arrow-icon`,
		blockClass ? `${blockClass}__carousel-navigation-arrow-icon` : '',
	);

	return (
		<Fragment>
			<div className={arrowItemPrevClass}>
				<svg className={arrowIconClass} width="22" height="40" xmlns="http://www.w3.org/2000/svg">
					<g style={{ mixBlendMode: 'multiply' }} stroke="#000" fill="none" fillRule="evenodd" strokeLinecap="round">
						<path d="M1 20L21 1M21 39L1 20" />
					</g>
				</svg>
			</div>
			<div className={arrowItemNextClass}>
				<svg className={arrowIconClass} width="22" height="40" xmlns="http://www.w3.org/2000/svg">
					<g style={{ mixBlendMode: 'multiply' }} stroke="#000" fill="none" fillRule="evenodd" strokeLinecap="round">
						<path d="M21 20L1 1M1 39l20-19" />
					</g>
				</svg>
			</div>
		</Fragment>
	);
};
