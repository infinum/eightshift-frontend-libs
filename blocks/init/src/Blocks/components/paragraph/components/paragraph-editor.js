import React, { useMemo } from 'react';
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';
import { selector, checkAttr, getAttrKey, pasteInto, outputCssVariables, getUnique } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';
import globalManifest from './../../../manifest.json';

export const ParagraphEditor = (attributes) => {
	const unique = useMemo(() => getUnique(), []);

	const {
		componentClass,
		options: manifestOptions,
	} = manifest;

	const {
		setAttributes,
		selectorClass = componentClass,
		blockClass,
		additionalClass,
		placeholder = __('Add Content', 'eightshift-frontend-libs'),

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

	return (
		<>
			{paragraphUse &&
				<>
					{outputCssVariables(attributes, manifest, unique, globalManifest)}

					<RichText
						identifier={getAttrKey('paragraphContent', attributes, manifest)}
						className={paragraphClass}
						placeholder={placeholder}
						value={paragraphContent}
						onChange={(value) => {
							setAttributes({ [getAttrKey('paragraphContent', attributes, manifest)]: value })
						}}
						allowedFormats={['core/bold', 'core/link', 'core/italic']}
						onSplit={onSplit}
						onMerge={mergeBlocks}
						onReplace={onReplace}
						onRemove={onRemove}
						onPaste={(event) => pasteInto(event, attributes, setAttributes, manifestOptions.pasteAllowTags, 'p')}
						deleteEnter={true}
						data-id={unique}
					/>
				</>
			}
		</>
	);
};
