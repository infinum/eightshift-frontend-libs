import React from 'react'; // eslint-disable-line no-unused-vars
import { Fragment } from '@wordpress/element';
import classnames from 'classnames';
import { selectorBlock, checkAttr } from '@eightshift/frontend-libs/scripts/helpers';
import manifest from './../manifest.json';

export const ScrollToTopEditor = (attributes) => {
	const {
		componentClass = manifest.componentClass,
		selectorClass = componentClass,
		blockClass,

		scrollToTopUse = checkAttr('scrollToTopUse', attributes, manifest),

		scrollToTopContent = checkAttr('scrollToTopContent', attributes, manifest),

	} = attributes;

	const scrollClass = classnames(
		componentClass,
		selectorBlock(blockClass, selectorClass),
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
