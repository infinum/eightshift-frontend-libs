import React from 'react';
import { AnimatedVisibility } from '@eightshift/ui-components';

/**
 * @since 8.0.0
 *
 * A component that allows animated mounting/unmounting of inner components.
 *
 *  @deprecated Use `AnimatedVisibility` from `@eightshift/ui-components` instead.
 *
 * @param {object} props - AnimatedContentVisibility options.
 * @param {boolean} [props.showIf] - When to show the content.
 * @param {string?} [props.additionalContainerClasses] - If passed, content is wrapped in a container with these classes.
 * @param {React.Component?} [props.children] - Content to show.
 */
export const AnimatedContentVisibility = (props) => {
	const { showIf, additionalContainerClasses, children } = props;

	return (
		<AnimatedVisibility visible={showIf} className={additionalContainerClasses}>
			{children}
		</AnimatedVisibility>
	);
};
