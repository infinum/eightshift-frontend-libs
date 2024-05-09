import React from 'react';
import { RichText } from '@wordpress/block-editor';
import { selector, checkAttr, classnames, getAttrKey } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';

export const CopyrightEditor = (attributes) => {
	const {
		componentClass,
	} = manifest;

	const {
		selectorClass = componentClass,
		blockClass,
		additionalClass,
		setAttributes
	} = attributes;

	const copyrightUse = checkAttr('copyrightUse', attributes, manifest);
	const copyrightContent = checkAttr('copyrightContent', attributes, manifest);
	const copyrightYear = new Date().getFullYear();

	const copyrightClass = classnames(
		selector(componentClass, componentClass),
		selector(blockClass, blockClass, selectorClass),
		selector(additionalClass, additionalClass),
	);

	if (!copyrightUse) {
		return null;
	}

	return (
		<div className={copyrightClass}>
			&copy;{copyrightYear} | <RichText
				value={copyrightContent}
				onChange={(value) => setAttributes({ [getAttrKey('copyrightContent', attributes, manifest)]: value })}
				keepPlaceholderOnFocus
				allowedFormats={[]}
			/>
		</div>
	);
};
