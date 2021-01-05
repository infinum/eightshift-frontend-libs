import React from 'react';
import { Fragment } from '@wordpress/element';
import classnames from 'classnames';
import { selector, checkAttr } from '@eightshift/frontend-libs/scripts/helpers';
import manifest from './../manifest.json';

export const CopyrightEditor = (attributes) => {
	const {
		componentName = manifest.componentName,
		componentClass = manifest.componentClass,
		selectorClass = componentClass,
		blockClass,

		copyrightUse = checkAttr('copyrightUse', attributes, manifest, componentName),

		copyrightBy = checkAttr('copyrightBy', attributes, manifest, componentName),
		copyrightYear = checkAttr('copyrightYear', attributes, manifest, componentName),
		copyrightContent = checkAttr('copyrightContent', attributes, manifest, componentName),
	} = attributes;

	const copyrightClass = classnames([
		componentClass,
		selector(blockClass, blockClass, selectorClass),
	]);

	return (
		<Fragment>
			{copyrightUse &&
				<div className={copyrightClass}>
					{'&copy'} {copyrightBy} {copyrightYear} - {copyrightContent}
				</div>
			}
		</Fragment>
	);
};
