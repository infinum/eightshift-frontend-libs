import React from 'react';
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';
import { selector, checkAttr } from '@eightshift/frontend-libs/scripts/helpers';
import manifest from './../manifest.json';

export const ListsEditor = (attributes) => {
	const {
		componentName: manifestComponentName,
		componentClass: manifestComponentClass,
	} = manifest;

	const {
		setAttributes,
		componentName = manifestComponentName,
		componentClass = manifestComponentClass,
		selectorClass = componentClass,
		blockClass,
		placeholder = __('Add Content', 'eightshift-frontend-libs'),

		listsUse = checkAttr('listsUse', attributes, manifest, componentName),

		listsContent = checkAttr('listsContent', attributes, manifest, componentName),
		listsOrdered = checkAttr('listsOrdered', attributes, manifest, componentName),
		listsColor = checkAttr('listsColor', attributes, manifest, componentName),
		listsSize = checkAttr('listsSize', attributes, manifest, componentName),
		listsAlign = checkAttr('listsAlign', attributes, manifest, componentName),
	} = attributes;

	const listsClass = classnames([
		componentClass,
		selector(listsColor, componentClass, 'color', listsColor),
		selector(listsSize, componentClass, 'size', listsSize),
		selector(listsAlign, componentClass, 'align', listsAlign),
		selector(blockClass, blockClass, selectorClass),
	]);

	return (
		<>
			{listsUse &&
				<RichText
					tagName={listsOrdered}
					multiline="li"
					className={listsClass}
					placeholder={placeholder}
					value={listsContent}
					onChange={(value) => setAttributes({ [`${componentName}Content`]: value })}
					onTagNameChange={(value) => setAttributes({ [`${componentName}Ordered`]: value })}
					allowedFormats={['core/bold', 'core/link']}
				/>
			}
		</>
	);
};
