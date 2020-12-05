import React from 'react'; // eslint-disable-line no-unused-vars
import { Fragment } from '@wordpress/element';
import classnames from 'classnames';
import { selectorBlock, checkAttr } from '@eightshift/frontend-libs/scripts/helpers';
import manifest from '../manifest.json';

const { options } = manifest;

export const SocialLinksEditor = (attributes) => {
	const {
		componentClass = manifest.componentClass,
		selectorClass = componentClass,
		blockClass,

		socialLinksUse = checkAttr('socialLinksUse', attributes, manifest),

		socialLinks = checkAttr('socialLinks', attributes, manifest),
	} = attributes;

	const socialLinksClass = classnames([
		componentClass,
		selectorBlock(blockClass, selectorClass),
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
