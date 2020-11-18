import React from 'react'; // eslint-disable-line no-unused-vars
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import classnames from 'classnames';
import { RichText } from '@wordpress/block-editor';
import { selector, selectorB, checkAttr } from '@eightshift/frontend-libs/scripts/helpers';
import manifest from './../manifest.json';

export const LinkEditor = (attributes) => {
	const {
		setAttributes,
		componentClass = manifest.componentClass,
		selectorClass = componentClass,
		blockClass,
		placeholder = __('Add Content', 'eightshift-frontend-libs'),

		linkUse = checkAttr('linkUse', attributes, manifest),

		linkContent = checkAttr('linkContent', attributes, manifest),
		linkUrl = checkAttr('linkUrl', attributes, manifest),
	} = attributes;

	const linkWrapClass = classnames([
		selectorB(componentClass, 'wrap'),
		selector(componentClass, 'align', 'linkAlign', attributes, manifest),
		selectorB(blockClass, `${selectorClass}-wrap`),
	]);

	const linkClass = classnames([
		componentClass,
		selector(componentClass, 'size', 'linkSize', attributes, manifest),
		selector(componentClass, 'color', 'linkColor', attributes, manifest),
		!(linkContent && linkUrl) && `${componentClass}-placeholder`,
		selectorB(blockClass, selectorClass),
	]);

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
						formattingControls={[]}
					/>
				</div>
			}
		</Fragment>
	);
};
