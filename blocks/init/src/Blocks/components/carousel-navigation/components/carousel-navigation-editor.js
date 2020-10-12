import React from 'react'; // eslint-disable-line no-unused-vars
import classnames from 'classnames';
import { Fragment } from '@wordpress/element';

export const CarouselNavigationEditor = (props) => {
	const {
		prevClass,
		nextClass,
		blockClass,
		componentClass = 'carousel-navigation',
		use = true,
	} = props;

	const arrowPrevClass = classnames(
		`${componentClass}__arrow-item`,
		`${componentClass}__arrow-item--prev`,
		blockClass && `${blockClass}__carousel-navigation-arrow-item`,
		blockClass && `${blockClass}__carousel-navigation-arrow-item--prev`,
		prevClass
	);

	const arrowNextClass = classnames(
		`${componentClass}__arrow-item`,
		`${componentClass}__arrow-item--next`,
		blockClass && `${blockClass}__carousel-navigation-arrow-item`,
		blockClass && `${blockClass}__carousel-navigation-arrow-item--next`,
		nextClass
	);

	const arrowIconClass = classnames(
		`${componentClass}__arrow-icon`,
		blockClass && `${blockClass}__carousel-navigation-arrow-icon`,
	);

	return (
		<Fragment>
			{use &&
				<Fragment>
					<div className={arrowPrevClass}>
						<svg className={arrowIconClass} width="22" height="40" xmlns="http://www.w3.org/2000/svg">
							<g style={{ mixBlendMode: 'multiply' }} stroke="#000" fill="none" fillRule="evenodd" strokeLinecap="round">
								<path d="M1 20L21 1M21 39L1 20" />
							</g>
						</svg>
					</div>
					<div className={arrowNextClass}>
						<svg className={arrowIconClass} width="22" height="40" xmlns="http://www.w3.org/2000/svg">
							<g style={{ mixBlendMode: 'multiply' }} stroke="#000" fill="none" fillRule="evenodd" strokeLinecap="round">
								<path d="M21 20L1 1M1 39l20-19" />
							</g>
						</svg>
					</div>
				</Fragment>
			}
		</Fragment>
	);
};
