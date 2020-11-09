import React from 'react'; // eslint-disable-line no-unused-vars
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import classnames from 'classnames';
import { RichText } from '@wordpress/block-editor';
import manifest from '../manifest.json';

const { attributes: defaults } = manifest;

export const LinkEditor = (attributes) => {
	const {
		setAttributes,
		componentClass = manifest.componentClass,
		selectorClass = componentClass,
		blockClass,
		placeholder = __('Add Content', 'eightshift-boilerplate'),

		linkUse = defaults.linkUse.default,

		linkContent,
		linkUrl,
		linkColor = defaults.linkColor.default,
		linkSize = defaults.linkSize.default,
		linkWidth = defaults.linkWidth.default,
		linkAlign = defaults.linkAlign.default,
	} = attributes;

	const linkClass = classnames(
		componentClass,
		linkSize && `${componentClass}__size--${linkSize}`,
		linkColor && `${componentClass}__color--${linkColor}`,
		linkWidth && `${componentClass}__size-width--${linkWidth}`,
		!(linkContent && linkUrl) && `${componentClass}__placeholder`,
	);

	const linkWrapClass = classnames(
		`${componentClass}__wrap`,
		linkAlign && `${componentClass}__align--${linkAlign}`,
		blockClass && `${blockClass}__${selectorClass}`,
	);

	return (
		<Fragment>
			{linkUse &&
				<div className={linkWrapClass}>
					<RichText
						placeholder={placeholder}
						value={linkContent}
						onChange={(value) => setAttributes({ linkContent: value })}
						className={linkClass}
						keepPlaceholderOnFocus
						allowedFormats={[]}
					/>
				</div>
			}
		</Fragment>
	);
};
