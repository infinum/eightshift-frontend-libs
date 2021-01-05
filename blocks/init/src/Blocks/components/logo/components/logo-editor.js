import React from 'react';
import classnames from 'classnames';
import { Fragment } from '@wordpress/element';
import { selector, checkAttr } from '@eightshift/frontend-libs/scripts/helpers';
import manifest from './../manifest.json';

export const LogoEditor = (attributes) => {
	const {
		componentName = manifest.componentName,
		componentClass = manifest.componentClass,
		selectorClass = componentClass,
		blockClass,

		logoUse = checkAttr('logoUse', attributes, manifest, componentName),

		logoSrc = checkAttr('logoSrc', attributes, manifest, componentName),
		logoAlt = checkAttr('logoAlt', attributes, manifest, componentName),
		logoTitle = checkAttr('logoTitle', attributes, manifest, componentName),
		logoHref = checkAttr('logoHref', attributes, manifest, componentName),
	} = attributes;

	const logoClass = classnames([
		componentClass,
		selector(blockClass, blockClass, selectorClass),
	]);

	const imgClass = classnames([
		selector(componentClass, componentClass, 'img'),
	]);

	return (
		<Fragment>
			{logoUse &&
				<a className={logoClass} href={logoHref}>
					<img
						src={logoSrc}
						alt={logoAlt}
						title={logoTitle}
						className={imgClass}
					/>
				</a>
			}
		</Fragment>
	);
};
