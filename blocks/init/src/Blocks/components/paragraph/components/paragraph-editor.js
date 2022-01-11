import React, { useMemo } from 'react';
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';
import { selector, checkAttr, getAttrKey, outputCssVariables, getUnique, classnames } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';
import globalManifest from './../../../manifest.json';

export const ParagraphEditor = (attributes) => {
	const unique = useMemo(() => getUnique(), []);

	const {
		componentClass,
	} = manifest;

	const {
		setAttributes,
		selectorClass = componentClass,
		blockClass,
		additionalClass,
		placeholder = __('Add content', 'eightshift-frontend-libs'),

		onSplit,
		mergeBlocks,
		onReplace,
		onRemove,
	} = attributes;

	const paragraphUse = checkAttr('paragraphUse', attributes, manifest);
	const paragraphContent = checkAttr('paragraphContent', attributes, manifest);

	const paragraphClass = classnames([
		selector(componentClass, componentClass),
		selector(blockClass, blockClass, selectorClass),
		selector(additionalClass, additionalClass),
	]);

	if (!paragraphUse) {
		return null;
	}

	return (
		<>
			{outputCssVariables(attributes, manifest, unique, globalManifest)}

			<RichText
				identifier={getAttrKey('paragraphContent', attributes, manifest)}
				className={paragraphClass}
				placeholder={placeholder}
				value={paragraphContent}
				onChange={(value) => {
					setAttributes({ [getAttrKey('paragraphContent', attributes, manifest)]: value });
				}}
				allowedFormats={['core/bold', 'core/link', 'core/italic']}
				onSplit={onSplit}
				onMerge={mergeBlocks}
				onReplace={onReplace}
				onRemove={onRemove}
				deleteEnter={true}
				data-id={unique}
			/>
		</>
	);
};
