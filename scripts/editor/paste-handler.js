import { createBlock } from '@wordpress/blocks';
import { select, dispatch } from '@wordpress/data';

/**
 * Returns string parsed as nodes, ready for inserting into RichText.
 *
 * @param {string} inputText - HTML string for parsing.
 * 
 * @returns {array} Items to insert into RichText.
 */
const processTag = (inputTextParam) => {
	// If it's only text, wrap it in span for processing
	const inputText = !inputTextParam.startsWith('<') ? `<span>${inputTextParam}</span>` : inputTextParam;

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
 * @param {string} textFromClipboard - Text retrieved from clipboard.
 * @param {object} attributes        - Component attributes.
 * @param {function} setAttributes   - Component attribute setter.
 * 
 * @returns {void}
 */
const handlePaste = (textFromClipboard, attributes, setAttributes) => {
	const componentName = attributes.componentName ?? attributes.blockName;

	// Split by newLine, discard empty lines
	let parsedParagraphs = textFromClipboard.split('\n').filter((line) => line.length > 0);

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
		setAttributes({ [`${componentName}Content`]: `${attributes[`${componentName}Content`]}${parsedParagraphs[0]}` });
	}

	for (const paragraph of parsedParagraphs.slice(1)) {

		// Create a new block with the same attributes, but different content
		const block = createBlock(`eightshift-boilerplate/${componentName}`, {
			...attributes,
			[`${componentName}Content`]: paragraph
		});

		const currentBlockClientId = select('core/block-editor').getSelectedBlockClientId();

		const blockIndex = select('core/block-editor').getBlockIndex(currentBlockClientId);

		// Insert the block
		dispatch('core/block-editor').insertBlock(block, blockIndex + 1);
	}
}

/**
 * Paste event handler.
 *
 * @param {Event} event               - Passed event parameters.
 * @param {object} attributes         - Component attributes.
 * @param {function} setAttributes    - Component attribute setter.
 * @param {array} allowedTags         - Tags allowed in the parsed output.
 * @param {string} [splitOnElement=p] - Element tag name that will cause a block to be split.
 * 
 * @returns {void}
 *
 * Usage:
 * ```js
 * pasteInto(event, attributes, setAttributes, manifestOptions.pasteAllowTags, 'p')}
 * ```
 */
export const pasteInto = (event, attributes, setAttributes, allowedTags, splitOnElement = 'p') => {
	event.preventDefault();
	const [copiedData, copiedHtml] = event.clipboardData.items;

	// If HTML content is in clipboard, process that...
	if (copiedHtml) {
		copiedHtml.getAsString((inputTextParam) => {
			let inputText = inputTextParam;

			// Get all tags from the text
			const allTags = [...inputText.matchAll(/<.+?>/g)];

			// Filter out attributes and disallowed tags,
			// make <splitOnElement> and <br> elements give newline
			for (const tag of allTags) {
				const tagInnardsRegex = /(\S+)=["']?((?:.(?!["']?\s+(?:\S+)=|\s*\/?[>"']))+.)["']?/g;
				const parsedTag = tag[0].replace(tagInnardsRegex, '');
				const filteredTagName = parsedTag.replaceAll(/[<>/\s]+/g, '');

				if (allowedTags.includes(filteredTagName)) {
					inputText = inputText.replace(tag[0], parsedTag).replace(' >', '>');
				} else if ((filteredTagName === splitOnElement && !tag[0].includes('/')) || filteredTagName === 'br') {
					inputText = inputText.replace(tag[0], '\n');
				} else {
					inputText = inputText.replace(tag[0], '');
				}
			}

			handlePaste(inputText, attributes, setAttributes);
		});
	}
	// ...else handle plaintext
	else if (copiedData) {
		copiedData.getAsString((inputText) => handlePaste(inputText, attributes, setAttributes));
	}
};
