import React, { useMemo } from 'react';
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';
import { selector, checkAttr, getAttrKey, outputCssVariables, getUnique } from '@eightshift/frontend-libs/scripts';
import { clsx } from '@eightshift/ui-components/utilities';
import manifest from './../manifest.json';
import globalManifest from './../../../manifest.json';

export const HeadingEditor = (attributes) => {
	const unique = useMemo(() => getUnique(), []);

	const {
		componentClass,
	} = manifest;

	const {
		setAttributes,

		blockClass,
		additionalClass,
		selectorClass = componentClass,

		placeholder = __('Add content', '%g_textdomain%'),
	} = attributes;

	const headingUse = checkAttr('headingUse', attributes, manifest);
	const headingContent = checkAttr('headingContent', attributes, manifest);

	const headingClass = clsx(
		selector(componentClass, componentClass),
		selector(blockClass, blockClass, selectorClass),
		selector(additionalClass, additionalClass),
	);

	if (!headingUse) {
		return null;
	}

	return (
		<>
			{outputCssVariables(attributes, manifest, unique, globalManifest)}

			<RichText
				className={headingClass}
				placeholder={placeholder}
				value={headingContent}
				onChange={(value) => setAttributes({ [getAttrKey('headingContent', attributes, manifest)]: value })}
				allowedFormats={[]}
				data-id={unique}
			/>
		</>
	);
};
