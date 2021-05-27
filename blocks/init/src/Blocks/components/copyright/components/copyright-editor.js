import React from 'react';
import classnames from 'classnames';
import { selector, checkAttr } from '@eightshift/frontend-libs/scripts/helpers';
import manifest from './../manifest.json';

export const CopyrightEditor = (attributes) => {
	const {
		componentClass: manifestComponentClass,
	} = manifest;

	const {
		componentClass = manifestComponentClass,
		selectorClass = componentClass,
		blockClass,

		copyrightUse = checkAttr('copyrightUse', attributes, manifest),

		copyrightBy = checkAttr('copyrightBy', attributes, manifest),
		copyrightYear = checkAttr('copyrightYear', attributes, manifest),
		copyrightContent = checkAttr('copyrightContent', attributes, manifest),
	} = attributes;

	const copyrightClass = classnames([
		componentClass,
		selector(blockClass, blockClass, selectorClass),
	]);

	return (
		<>
			{copyrightUse &&
				<div className={copyrightClass}>
					{'&copy'} {copyrightBy} {copyrightYear} - {copyrightContent}
				</div>
			}
		</>
	);
};
