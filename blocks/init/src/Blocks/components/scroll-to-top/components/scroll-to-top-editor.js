import React from 'react'; // eslint-disable-line no-unused-vars
import { Fragment } from '@wordpress/element';
import classnames from 'classnames';
import manifest from './../manifest.json';

const { attributes: defaults } = manifest;

export const ScrollToTopEditor = (attributes) => {
	const {
		componentClass = manifest.componentClass,
		selectorClass = componentClass,
		blockClass,

		scrollToTopUse = defaults.scrollToTopUse.default,

		scrollToTopContent = defaults.scrollToTopContent.default,

	} = attributes;

	const scrollClass = classnames(
		componentClass,
		blockClass && `${blockClass}__${selectorClass}`,
	);

	return (
		<Fragment>
			{scrollToTopUse &&
				<button className={scrollClass}>
					{scrollToTopContent}
				</button>
			}
		</Fragment>
	);
};
