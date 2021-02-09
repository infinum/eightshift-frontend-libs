import React from 'react';
import { Fragment } from '@wordpress/element';
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';
import { createBlock } from '@wordpress/blocks';
import { selector, checkAttr } from '@eightshift/frontend-libs/scripts/helpers';

import manifest from './../manifest.json';

export const ParagraphEditor = (attributes) => {
	const {
		setAttributes,
		componentName = manifest.componentName,
		componentClass = manifest.componentClass,
		selectorClass = componentClass,
		onSplit,
		mergeBlocks,
		onReplace,
		onRemove,
		blockClass,
		placeholder = __('Add Content', 'Tema'),

		paragraphUse = checkAttr('paragraphUse', attributes, manifest, componentName),

		paragraphContent = checkAttr('paragraphContent', attributes, manifest, componentName),
		paragraphColor = checkAttr('paragraphColor', attributes, manifest, componentName),
		paragraphSize = checkAttr('paragraphSize', attributes, manifest, componentName),
		paragraphAlign = checkAttr('paragraphAlign', attributes, manifest, componentName),
	} = attributes;

	const allowedTags = manifest.pasteAllowTags ?? ['strong', 'b', 'i', 'em', 'span'];

	const paragraphClass = classnames([
		componentClass,
		selector(paragraphColor, componentClass, 'color', paragraphColor),
		selector(paragraphSize, componentClass, 'size', paragraphSize),
		selector(paragraphAlign, componentClass, 'align', paragraphAlign),
		selector(blockClass, blockClass, selectorClass),
	]);

	/**
	 * Returns string parsed as nodes, ready for inserting into RichText.
	 *
	 * @param {string} inputText HTML string for parsing.
	 */
	const processTag = (inputText) => {
		// If it's only text wrap it in span for processing
		if (!inputText.startsWith('<')) {
			inputText = `<span>${inputText}</span>`;
		}

		let output = [];

		const matches = [...inputText.matchAll(/<.+?>.+?<\/.+?>/g)];

		for (const [match] of matches) {
			const elementTag = match.match(/<.+?>/g)[0];
			const filteredTagName = elementTag.replaceAll(/[<>/\s]+/g, '');
			const innerText = match.replaceAll(/<.+?>/g, '');

			if (filteredTagName === 'span') {
				output = [...output, document.createTextNode(`${innerText}`)];
			} else {
				let newElement = document.createElement(filteredTagName);
				newElement.appendChild(document.createTextNode(innerText));

				output = [...output, newElement];
			}
		}

		return output;
	}

	/**
	 * Process content and paste in into blocks smartly.
	 *
	 * @param {string} textFromClipboard Text retrieved from clipboard.
	 */
	const handlePaste = async (textFromClipboard) => {
		// Split by newLine, discard empty lines
		const parsedParagraphs = textFromClipboard.split('\n').filter((line) => line.length > 0);

		// If something is selected replace it...
		if (window.getSelection) {
			const selection = window.getSelection();

			let selectedRange = selection.getRangeAt(0);

			// Process elements into nodes
			const processedElements = processTag(parsedParagraphs[0]);

			// Remove current text
			if (!selectedRange.collapsed) {
				selectedRange.deleteContents();
			}

			// Insert them one by one and keep spaces
			for (const element of processedElements) {
				selectedRange = selectedRange.cloneRange();
				selectedRange.insertNode(element);
				selectedRange.setStartAfter(element);
				selectedRange.collapse(true);
			}
		}
		// ...else append at the end
		else {
			setAttributes({ [`${componentName}Content`]: `${paragraphContent}${parsedParagraphs[0]}` });
		}

		for (const paragraph of parsedParagraphs.slice(1)) {

			// Create a new block with the same attributes, but different content
			const block = createBlock(`eightshift-boilerplate/${componentName}`, {
				...attributes,
				[`${componentName}Content`]: paragraph
			});

			const currentBlockClientId = wp.data.select('core/block-editor').getSelectedBlockClientId();
			
			const blockIndex = wp.data.select('core/block-editor').getBlockIndex(currentBlockClientId);

			// Insert the block
			wp.data.dispatch('core/block-editor').insertBlock(block, blockIndex + 1);
		}
	}

	/**
	 * Paste event handler.
	 *
	 * @param {Event} event Passed event parameters.
	 */
	const pasteInto = (event) => {
		event.preventDefault();
		const [copiedData, copiedHtml] = event.clipboardData.items;

		// If HTML content is in clipboard, process that...
		if (copiedHtml) {
			copiedHtml.getAsString(async (inputText) => {
				// Get all tags from the text
				const allTags = [...inputText.matchAll(/<.+?>/g)];

				// Filter out attributes and disallowed tags,
				// make <p> and <br> elements give newline
				for (const tag of allTags) {
					const tagInnardsRegex = /(\S+)=["']?((?:.(?!["']?\s+(?:\S+)=|\s*\/?[>"']))+.)["']?/g;
					const parsedTag = tag[0].replace(tagInnardsRegex, '');
					const filteredTagName = parsedTag.replaceAll(/[<>/\s]+/g, '');

					if (allowedTags.includes(filteredTagName)) {
						inputText = inputText.replace(tag[0], parsedTag).replace(' >', '>');
					}
					else if ((filteredTagName === 'p' && !tag[0].includes('/')) || filteredTagName === 'br') {
						inputText = inputText.replace(tag[0], '\n');
					}
					else {
						inputText = inputText.replace(tag[0], '');
					}
				}

				handlePaste(inputText);
			});
		}
		// ...else handle plaintext
		else if (copiedData) {
			copiedData.getAsString(handlePaste);
		}
	};

	return (
		<Fragment>
			{paragraphUse &&
				<RichText
					identifier={`${componentName}Content`}
					className={paragraphClass}
					placeholder={placeholder}
					value={paragraphContent}
					onChange={(value) => {
						setAttributes({ [`${componentName}Content`]: value })
					}}
					allowedFormats={['core/bold', 'core/link', 'core/italic']}
					onSplit={onSplit}
					onMerge={mergeBlocks}
					onReplace={onReplace}
					onRemove={onRemove}
					onPaste={pasteInto}
					deleteEnter={true}
				/>
			}
		</Fragment>
	);
};
