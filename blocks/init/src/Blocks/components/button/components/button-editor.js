import React, { useMemo } from 'react';
import { __ } from '@wordpress/i18n';
import classnames from 'classnames';
import { RichText } from '@wordpress/block-editor';
import { outputCssVariables, getUnique } from '@eightshift/frontend-libs/scripts/editor';
import { checkAttr, getAttrKey, selector } from '@eightshift/frontend-libs/scripts/helpers';
import manifest from './../manifest.json';
import globalManifest from './../../../manifest.json';

export const ButtonEditor = (attributes) => {
	const unique = useMemo(() => getUnique(), []);

	const {
		componentClass: manifestComponentClass,
	} = manifest;

	const {
		setAttributes,
		componentClass = manifestComponentClass,
		selectorClass = componentClass,
		blockClass,
		placeholder = __('Add Content', 'eightshift-frontend-libs'),
	} = attributes;

	const buttonContent = checkAttr('buttonContent', attributes, manifest);
	const buttonUse = checkAttr('buttonUse', attributes, manifest);
	const buttonUrl = checkAttr('buttonUrl', attributes, manifest);

	const buttonClass = classnames([
		componentClass,
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
						onChange={(value) => setAttributes({ [getAttrKey('buttonContent', attributes, manifest)]: value })}
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
