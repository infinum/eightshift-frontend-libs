import React from 'react';
import { __ } from '@wordpress/i18n';
import classnames from 'classnames';
import { RichText } from '@wordpress/block-editor';
import { outputCssVariables, getUnique } from '@eightshift/frontend-libs/scripts/editor';
import { checkAttr, selector } from '@eightshift/frontend-libs/scripts/helpers';
import manifest from './../manifest.json';
import globalManifest from './../../../manifest.json';

export const ButtonEditor = (attributes) => {
	const unique = getUnique();

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

		buttonUse = checkAttr('buttonUse', attributes, manifest, componentName),

		buttonContent = checkAttr('buttonContent', attributes, manifest, componentName),
		buttonUrl = checkAttr('buttonUrl', attributes, manifest, componentName),
		buttonIsLink = checkAttr('buttonIsLink', attributes, manifest, componentName),
	} = attributes;

	const buttonClass = classnames([
		componentClass,
		selector(buttonIsLink, componentClass, 'is-link'),
		selector(!(buttonContent && buttonUrl), `${componentClass}-placeholder`),
		selector(blockClass, blockClass, selectorClass),
	]);

	return (
		<>
			{buttonUse &&
				<>
					{outputCssVariables(attributes, manifest, unique, globalManifest)}

					<RichText
						placeholder={placeholder}
						value={buttonContent}
						onChange={(value) => setAttributes({ [`${componentName}Content`]: value })}
						className={buttonClass}
						keepPlaceholderOnFocus
						allowedFormats={[]}
						data-id={unique}
					/>
				</>
			}
		</>
	);
};
