import React from 'react';
import { selector, checkAttr, classnames, props } from '@eightshift/frontend-libs/scripts';
import { TypographyEditor } from '../../typography/components/typography-editor';
import manifest from './../manifest.json';

export const CopyrightEditor = (attributes) => {
	const {
		componentClass,
	} = manifest;

	const {
		selectorClass = componentClass,
		blockClass,
		additionalClass,
	} = attributes;

	const copyrightUse = checkAttr('copyrightTypographyUse', attributes, manifest);
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
			&copy;{copyrightYear} | <TypographyEditor
				{...props('typography', attributes)}
			/>
		</div>
	);
};
