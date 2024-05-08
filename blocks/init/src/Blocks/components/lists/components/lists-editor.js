import React, { useMemo } from 'react';
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';
import { outputCssVariables, getUnique, selector, checkAttr, getAttrKey, getOption, classnames } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';
import globalManifest from './../../../manifest.json';

export const ListsEditor = (attributes) => {
	const unique = useMemo(() => getUnique(), []);

	const {
		componentClass,
	} = manifest;

	const {
		setAttributes,
		selectorClass = componentClass,
		blockClass,
		additionalClass,
		placeholder = __('Add content', '%g_textdomain%'),
	} = attributes;

	const listsUse = checkAttr('listsUse', attributes, manifest);
	const listsContent = checkAttr('listsContent', attributes, manifest);
	const listsOrdered = checkAttr('listsOrdered', attributes, manifest);

	const listsOrderedOptions = getOption('listsOrdered', attributes, manifest).map(option => option.value);
	const listsDefault = manifest.attributes.listsOrdered.default;
	if (!listsOrderedOptions.includes(listsOrdered)) {
		setAttributes({ [getAttrKey('listsOrdered', attributes, manifest)]: listsDefault }); // Resets the attribute to the default value if invalid value set.
	}

	const listsClass = classnames(
		selector(componentClass, componentClass),
		selector(blockClass, blockClass, selectorClass),
		selector(additionalClass, additionalClass),
	);

	if (!listsUse) {
		return null;
	}

	return (
		<>
			{outputCssVariables(attributes, manifest, unique, globalManifest)}

			<RichText
				tagName={listsOrdered}
				multiline='li'
				className={listsClass}
				placeholder={placeholder}
				value={listsContent}
				onChange={(value) => setAttributes({ [getAttrKey('listsContent', attributes, manifest)]: value })}
				onTagNameChange={(value) => setAttributes({ [getAttrKey('listsOrdered', attributes, manifest)]: value })}
				allowedFormats={['core/bold', 'core/link']}
				data-id={unique}
			/>
		</>

	);
};
