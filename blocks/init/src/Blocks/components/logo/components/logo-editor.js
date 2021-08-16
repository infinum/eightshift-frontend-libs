import React from 'react';
import classnames from 'classnames';
import { selector, checkAttr } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';

export const LogoEditor = (attributes) => {
	const {
		componentClass,
	} = manifest;

	const {
		selectorClass = componentClass,
		blockClass,
		additionalClass,
	} = attributes;

	const logoUse = checkAttr('logoUse', attributes, manifest);
	const logoSrc = checkAttr('logoSrc', attributes, manifest);
	const logoAlt = checkAttr('logoAlt', attributes, manifest);
	const logoTitle = checkAttr('logoTitle', attributes, manifest);
	const logoHref = checkAttr('logoHref', attributes, manifest);

	const logoClass = classnames([
		selector(componentClass, componentClass),
		selector(blockClass, blockClass, selectorClass),
		selector(additionalClass, additionalClass),
	]);

	const imgClass = classnames([
		selector(componentClass, componentClass, 'img'),
	]);

	if (!logoUse) {
		return null;
	}

	return (
		<a className={logoClass} href={logoHref}>
			<img
				src={logoSrc}
				alt={logoAlt}
				title={logoTitle}
				className={imgClass}
			/>
		</a>
	);
};
