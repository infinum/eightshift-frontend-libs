import React from 'react';
import { Fragment } from '@wordpress/element';
import classnames from 'classnames';
import { selector, checkAttr } from '@eightshift/frontend-libs/scripts/helpers';
import manifest from '../manifest.json';

const { options } = manifest;

export const SocialLinksEditor = (attributes) => {
	const {
		componentName = manifest.componentName,
		componentClass = manifest.componentClass,
		selectorClass = componentClass,
		blockClass,

		socialLinksUse = checkAttr('socialLinksUse', attributes, manifest, componentName),

		socialLinks = checkAttr('socialLinks', attributes, manifest, componentName),
	} = attributes;

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
		<Fragment>
			{socialLinksUse &&
				<ul className={socialLinksClass}>
					{socialLinks.map((element, index) => {
						return (
							<SocialItem {...element} key={index} />
						);
					})}
				</ul>
			}
		</Fragment>
	);
};
