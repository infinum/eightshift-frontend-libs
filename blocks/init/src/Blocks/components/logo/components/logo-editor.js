import React from 'react'; // eslint-disable-line no-unused-vars
import classnames from 'classnames';
import { Fragment } from '@wordpress/element';

export const LogoEditor = (props) => {
	const {
		src,
		alt,
		title,
		href,
		componentClass = 'logo',
		blockClass,
		use = true,
	} = props;

	const logoClass = classnames(
		componentClass,
		blockClass && `${blockClass}__${componentClass}`,
	);

	return (
		<Fragment>
			{use &&
				<a className={logoClass} href={href}>
					<img
						src={src}
						alt={alt}
						title={title}
						className={`${componentClass}__img`}
					/>
				</a>
			}
		</Fragment>
	);
};
