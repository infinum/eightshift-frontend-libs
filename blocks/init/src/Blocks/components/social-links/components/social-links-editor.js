import React from 'react';
import classnames from 'classnames';
import { selector, checkAttr } from '@eightshift/frontend-libs/scripts/helpers';
import manifest from '../manifest.json';

export const SocialLinksEditor = (attributes) => {
	const {
		componentName: manifestComponentName,
		componentClass: manifestComponentClass,
		options: manifestOptions,
	} = manifest;

	const {
		componentName = manifestComponentName,
		componentClass = manifestComponentClass,
		selectorClass = componentClass,
		blockClass,

		socialLinksUse = checkAttr('socialLinksUse', attributes, manifest, componentName),

		socialLinks = checkAttr('socialLinks', attributes, manifest, componentName),
	} = attributes;

	const options = {...manifestOptions, ...attributes.options};

	const socialLinksClass = classnames([
		componentClass,
		selector(blockClass, blockClass, selectorClass),
	]);

	const SocialItem = (props) => {
		const {
			href,
			icon,
			title,
		} = props;

		return (
			<li className={`${componentClass}__item`}>
				<a className={`${componentClass}__link`} href={href} title={title} dangerouslySetInnerHTML={{ __html: options.icons[icon] }} target="_blank" rel="nofollow noreferrer noopener"></a>
			</li>
		);
	};

	return (
		<>
			{socialLinksUse &&
				<ul className={socialLinksClass}>
					{socialLinks.map((element, index) => {
						return (
							<SocialItem {...element} key={index} />
						);
					})}
				</ul>
			}
		</>
	);
};
