import React, { useMemo } from 'react';
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';
import { selector, checkAttr } from '@eightshift/frontend-libs/scripts/helpers';
import { outputCssVariables, getUnique } from '@eightshift/frontend-libs/scripts/editor';
import manifest from './../manifest.json';
import globalManifest from './../../../manifest.json';

export const ListsEditor = (attributes) => {
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

		listsUse = checkAttr('listsUse', attributes, manifest, componentName),

		listsContent = checkAttr('listsContent', attributes, manifest, componentName),
		listsOrdered = checkAttr('listsOrdered', attributes, manifest, componentName),
	} = attributes;

	const listsClass = classnames([
		componentClass,
		selector(blockClass, blockClass, selectorClass),
	]);

	return (
		<>
			{listsUse &&
				<>
					{outputCssVariables(attributes, manifest, unique, globalManifest)}

					<RichText
						tagName={listsOrdered}
						multiline="li"
						className={listsClass}
						placeholder={placeholder}
						value={listsContent}
						onChange={(value) => setAttributes({ [`${componentName}Content`]: value })}
						onTagNameChange={(value) => setAttributes({ [`${componentName}Ordered`]: value })}
						allowedFormats={['core/bold', 'core/link']}
						data-id={unique}
					/>
				</>
			}
		</>
	);
};
