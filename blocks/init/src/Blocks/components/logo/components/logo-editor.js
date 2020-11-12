import React from 'react'; // eslint-disable-line no-unused-vars
import classnames from 'classnames';
import { Fragment } from '@wordpress/element';
import manifest from './../manifest.json';

const { attributes: defaults } = manifest;

export const LogoEditor = (attributes) => {
	const {
		componentClass = manifest.componentClass,
		selectorClass = componentClass,
		blockClass,

		logoUse = defaults.logoUse.default,

		logoSrc,
		logoAlt,
		logoTitle,
		logoHref,
	} = attributes;

	const logoClass = classnames([
		componentClass,
		blockClass && `${blockClass}__${selectorClass}`,
	]);

	return (
		<Fragment>
			{logoUse &&
				<a className={logoClass} href={logoHref}>
					<img
						src={logoSrc}
						alt={logoAlt}
						title={logoTitle}
						className={`${componentClass}__img`}
					/>
				</a>
			}
		</Fragment>
	);
};
