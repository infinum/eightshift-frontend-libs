import React from 'react';
import classnames from 'classnames';
import { selector, checkAttr } from '@eightshift/frontend-libs/scripts';
import manifest from '../manifest.json';

export const SocialLinksEditor = (attributes) => {
	const {
		componentClass,
	} = manifest;

	const {
		selectorClass = componentClass,
		blockClass,
		additionalClass,
	} = attributes;

	const socialLinksUse = checkAttr('socialLinksUse', attributes, manifest);
	const socialLinksItems = checkAttr('socialLinksItems', attributes, manifest);

	const socialLinksClass = classnames([
		selector(componentClass, componentClass),
		selector(blockClass, blockClass, selectorClass),
		selector(additionalClass, additionalClass),
	]);

	const socialLinksItemClass = selector(componentClass, componentClass, 'item');
	const socialLinksLinkClass = selector(componentClass, componentClass, 'link');

	if (!socialLinksUse) {
		return null;
	}

	return (
		<ul className={socialLinksClass}>
			{socialLinksItems.map(({ href, icon, title }, index) => (
				<li className={socialLinksItemClass} key={index}>
					<a
						className={socialLinksLinkClass}
						href={href}
						title={title}
						dangerouslySetInnerHTML={{ __html: manifest.icons[icon] }}
						target="_blank" rel="noreferrer noopener"
					></a>
				</li>
			))}
		</ul>
	);
};
