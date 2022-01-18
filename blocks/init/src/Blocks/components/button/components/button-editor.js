import React, { useMemo } from 'react';
import { __ } from '@wordpress/i18n';
import classnames from 'classnames';
import { RichText } from '@wordpress/block-editor';
import { outputCssVariables, getUnique, checkAttr, getAttrKey, selector } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';
import globalManifest from './../../../manifest.json';

export const ButtonEditor = (attributes) => {
	const {
		componentClass,
	} = manifest;

	const {
		setAttributes,
		selectorClass = componentClass,
		additionalClass,
		blockClass,
		placeholder = __('Add content', 'eightshift-boilerplate'),
		uniqueWrapperId,
	} = attributes;

	const unique = uniqueWrapperId ?? useMemo(() => getUnique(), []);

	const buttonContent = checkAttr('buttonContent', attributes, manifest);
	const buttonUse = checkAttr('buttonUse', attributes, manifest);

	const buttonClass = classnames([
		selector(componentClass, componentClass),
		selector(blockClass, blockClass, selectorClass),
		selector(additionalClass, additionalClass),
	]);

	if (!buttonUse) {
		return null;
	}

	return (
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
	);
};
