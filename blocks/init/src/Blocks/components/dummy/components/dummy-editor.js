import React, { useMemo } from 'react';
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';
import { selector, checkAttr, getAttrKey, outputCssVariables, getUnique, classnames } from '@eightshift/frontend-libs/scripts';
import manifest from '@eightshift/frontend-libs/blocks/init/src/Blocks/components/dummy/manifest.json';
import globalManifest from '@eightshift/frontend-libs/blocks/init/src/Blocks/manifest.json';

export const %block-name-pascal-case%Editor = (attributes) => {
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

	const %block-name-camel-case%Use = checkAttr('%block-name-camel-case%Use', attributes, manifest);
	const %block-name-camel-case%Content = checkAttr('%block-name-camel-case%Content', attributes, manifest);

	const %block-name-camel-case%Class = classnames(
		selector(componentClass, componentClass),
		selector(blockClass, blockClass, selectorClass),
		selector(additionalClass, additionalClass),
	);

	if (!%block-name-camel-case%Use) {
		return null;
	}

	return (
		<>
			{outputCssVariables(attributes, manifest, unique, globalManifest)}

			<RichText
				identifier={getAttrKey('%block-name-camel-case%Content', attributes, manifest)}
				className={%block-name-camel-case%Class}
				placeholder={placeholder}
				value={%block-name-camel-case%Content}
				onChange={(value) => setAttributes({ [getAttrKey('%block-name-camel-case%Content', attributes, manifest)]: value })}
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
