import React from 'react';
import classnames from 'classnames';
import { selector, checkAttr } from '@eightshift/frontend-libs/scripts/helpers';
import manifest from './../manifest.json';

export const LogoEditor = (attributes) => {
	const {
		componentClass: manifestComponentClass,
	} = manifest;

	const {
		componentClass = manifestComponentClass,
		selectorClass = componentClass,
		blockClass,
	} = attributes;

	const logoUse = checkAttr('logoUse', attributes, manifest);
	const logoSrc = checkAttr('logoSrc', attributes, manifest);
	const logoAlt = checkAttr('logoAlt', attributes, manifest);
	const logoTitle = checkAttr('logoTitle', attributes, manifest);
	const logoHref = checkAttr('logoHref', attributes, manifest);

	const logoClass = classnames([
		componentClass,
		selector(blockClass, blockClass, selectorClass),
	]);

	const imgClass = classnames([
		selector(componentClass, componentClass, 'img'),
	]);

	return (
		<>
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
		</>
	);
};
