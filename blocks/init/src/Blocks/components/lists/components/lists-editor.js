import React, { useMemo } from 'react';
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';
import { outputCssVariables, getUnique, selector, checkAttr, getAttrKey } from '@eightshift/frontend-libs/scripts';
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
		placeholder = __('Add content', 'newboilerplate'),
	} = attributes;

	const listsUse = checkAttr('listsUse', attributes, manifest);
	const listsContent = checkAttr('listsContent', attributes, manifest);
	const listsOrdered = checkAttr('listsOrdered', attributes, manifest);

	const listsClass = classnames([
		selector(componentClass, componentClass),
		selector(blockClass, blockClass, selectorClass),
		selector(additionalClass, additionalClass),
	]);

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
