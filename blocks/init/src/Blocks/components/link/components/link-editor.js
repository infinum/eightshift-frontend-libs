import React from 'react';
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import classnames from 'classnames';
import { RichText } from '@wordpress/block-editor';
import { selector, checkAttr } from '@eightshift/frontend-libs/scripts/helpers';
import manifest from './../manifest.json';

export const LinkEditor = (attributes) => {
	const {
		setAttributes,
		componentName = manifest.componentName,
		componentClass = manifest.componentClass,
		selectorClass = componentClass,
		blockClass,
		placeholder = __('Add Content', 'eightshift-frontend-libs'),

		linkUse = checkAttr('linkUse', attributes, manifest, componentName),

		linkContent = checkAttr('linkContent', attributes, manifest, componentName),
		linkUrl = checkAttr('linkUrl', attributes, manifest, componentName),
		linkAlign = checkAttr('linkAlign', attributes, manifest, componentName),
		linkSize = checkAttr('linkSize', attributes, manifest, componentName),
		linkColor = checkAttr('linkColor', attributes, manifest, componentName),
	} = attributes;

	const linkWrapClass = classnames([
		selector(componentClass, `${componentClass}-wrap`),
		selector(linkAlign, `${componentClass}-wrap`, 'align', linkAlign),
		selector(blockClass, blockClass, `${selectorClass}-wrap`),
	]);

	const linkClass = classnames([
		componentClass,
		selector(linkSize, componentClass, 'size', linkSize),
		selector(linkColor, componentClass, 'color', linkColor),
		selector(!(linkContent && linkUrl), `${componentClass}-placeholder`),
		selector(blockClass, blockClass, selectorClass),
	]);

	return (
		<Fragment>
			{linkUse &&
				<div className={linkWrapClass}>
					<RichText
						placeholder={placeholder}
						value={linkContent}
						onChange={(value) => setAttributes({ [`${componentName}Content`]: value })}
						className={linkClass}
						keepPlaceholderOnFocus
						formattingControls={[]}
					/>
				</div>
			}
		</Fragment>
	);
};
