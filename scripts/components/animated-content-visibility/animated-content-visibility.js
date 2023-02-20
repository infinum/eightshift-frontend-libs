import React from 'react';
import { classnames } from '../../helpers';
import { Animate } from '@wordpress/components';

/**
 * @since 8.0.0
 *
 * A wrapper around the Gutenberg Animate component.
 *
 * @param {object} props                               - AnimatedContentVisibility options.
 * @param {boolean} [props.showIf]                     - When to show the content.
 * @param {string?} [props.animation='slide-in']       - Animation to use.
 * @param {string?} [props.direction='bottom']         - Animation direction.
 * @param {string?} [props.additionalContainerClasses] - Classes to add to the animated container.
 * @param {React.Component?} [props.children]          - Content to show.
 */
export const AnimatedContentVisibility = (props) => {
	const {
		showIf,

		animation = 'slide-in',
		direction = 'bottom',

		additionalContainerClasses,

		children,
	} = props;

	if (!showIf) {
		return null;
	}

	return (
		<Animate type={animation} options={{ origin: direction }} >
			{({ className }) => (
				<div className={classnames(className, additionalContainerClasses)}>
					{children}
				</div>
			)}
		</Animate>
	);
};
