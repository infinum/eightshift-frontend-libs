import React, { useMemo } from 'react';
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';
import { outputCssVariables, getUnique, checkAttr, getAttrKey, selector, props } from '@eightshift/frontend-libs/scripts';
import { IconEditor } from '../../icon/components/icon-editor';
import { clsx } from '@eightshift/ui-components/utilities';
import manifest from './../manifest.json';
import globalManifest from './../../../manifest.json';

export const ButtonEditor = (attributes) => {
	const unique = useMemo(() => getUnique(), []);

	const {
		componentClass,
	} = manifest;

	const {
		setAttributes,
		selectorClass = componentClass,
		additionalClass,
		blockClass,
		placeholder = __('Add content', '%g_textdomain%'),
	} = attributes;

	const buttonContent = checkAttr('buttonContent', attributes, manifest);
	const buttonUse = checkAttr('buttonUse', attributes, manifest);

	const buttonClass = clsx(
		selector(componentClass, componentClass),
		selector(blockClass, blockClass, selectorClass),
		selector(additionalClass, additionalClass),
	);

	if (!buttonUse) {
		return null;
	}

	return (
		<>
			{outputCssVariables(attributes, manifest, unique, globalManifest)}

			<div className={buttonClass} data-id={unique}>
				<IconEditor
					{...props('icon', attributes, {
						blockClass: componentClass,
					})}
				/>

				<RichText
					placeholder={placeholder}
					value={buttonContent}
					onChange={(value) => setAttributes({ [getAttrKey('buttonContent', attributes, manifest)]: value })}
					keepPlaceholderOnFocus
					allowedFormats={[]}
				/>
			</div>
		</>
	);
};
