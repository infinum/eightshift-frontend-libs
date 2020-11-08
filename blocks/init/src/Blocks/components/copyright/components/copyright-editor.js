import React from 'react'; // eslint-disable-line no-unused-vars
import { Fragment } from '@wordpress/element';
import classnames from 'classnames';
import manifest from './../manifest.json';

const { attributes: defaults } = manifest;

export const CopyrightEditor = (attributes) => {
	const {
		componentClass = manifest.componentClass,
		selectorClass = componentClass,
		blockClass,

		copyrightUse = defaults.copyrightUse.default,

		copyrightBy,
		copyrightYear,
		copyrightContent,
	} = attributes;

	const copyrightClass = classnames(
		componentClass,
		blockClass && `${blockClass}__${selectorClass}`,
	);

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
