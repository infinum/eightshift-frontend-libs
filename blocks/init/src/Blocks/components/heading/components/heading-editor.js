import React from 'react';
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';
import { selector, checkAttr } from '@eightshift/frontend-libs/scripts/helpers';
import { outputCssVariables, getUnique } from '@eightshift/frontend-libs/scripts/editor';
import manifest from './../manifest.json';
import globalManifest from './../../../manifest.json';

export const HeadingEditor = (attributes) => {
	const unique = getUnique();
	const {
		setAttributes,
		componentName = manifest.componentName,
		componentClass = manifest.componentClass,
		selectorClass = componentClass,
		blockClass,
		placeholder = __('Add Content', 'eightshift-frontend-libs'),

		headingUse = checkAttr('headingUse', attributes, manifest, componentName),

		headingContent = checkAttr('headingContent', attributes, manifest, componentName),
		headingSize = checkAttr('headingSize', attributes, manifest, componentName),
	} = attributes;

	const headingClass = classnames([
		componentClass,
		selector(headingSize, componentClass, 'size', headingSize),
		selector(blockClass, blockClass, selectorClass),
	]);

	return (
		<>
			{outputCssVariables(attributes, manifest, unique, globalManifest)}

			{headingUse &&
				<RichText
					className={headingClass}
					placeholder={placeholder}
					value={headingContent}
					onChange={(value) => setAttributes({ [`${componentName}Content`]: value })}
					allowedFormats={[]}
					data-id={unique}
				/>
			}
		</>
	);
};
