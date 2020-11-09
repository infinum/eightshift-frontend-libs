import React from 'react'; // eslint-disable-line no-unused-vars
import { Fragment } from '@wordpress/element';
import classnames from 'classnames';
import manifest from '../manifest.json';

const { attributes: defaults, options } = manifest;

export const SocialLinksEditor = (attributes) => {
	const {
		componentClass = manifest.componentClass,
		selectorClass = componentClass,
		blockClass,

		socialLinksUse = defaults.socialLinksUse.default,

		socialLinksItems = defaults.socialLinksItems.default,
	} = attributes;

	const socialLinksClass = classnames(
		componentClass,
		blockClass && `${blockClass}__${selectorClass}`,
	);

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
					{socialLinksItems.map((element, index) => {
						return (
							<SocialItem {...element} key={index} />
						);
					})}
				</ul>
			}
		</Fragment>
	);
};
