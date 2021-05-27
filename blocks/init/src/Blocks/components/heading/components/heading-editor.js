import React, { useMemo } from 'react';
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';
import { selector, checkAttr } from '@eightshift/frontend-libs/scripts/helpers';
import { outputCssVariables, getUnique } from '@eightshift/frontend-libs/scripts/editor';
import manifest from './../manifest.json';
import globalManifest from './../../../manifest.json';

export const HeadingEditor = (attributes) => {
	const unique = useMemo(() => getUnique(), []);

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

		headingUse = checkAttr('headingUse', attributes, manifest),

		headingContent = checkAttr('headingContent', attributes, manifest),
	} = attributes;

	const headingClass = classnames([
		componentClass,
		selector(blockClass, blockClass, selectorClass),
	]);

	return (
		<>
			{headingUse &&
				<>
					{outputCssVariables(attributes, manifest, unique, globalManifest)}
					<RichText
						className={headingClass}
						placeholder={placeholder}
						value={headingContent}
						onChange={(value) => setAttributes({ [`${componentName}Content`]: value })}
						allowedFormats={[]}
						data-id={unique}
					/>
				</>
			}
		</>
	);
};
