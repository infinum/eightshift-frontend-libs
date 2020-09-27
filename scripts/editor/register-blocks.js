/* eslint-disable no-unused-vars */

import React from 'react';
import { registerBlockType, registerBlockVariation } from '@wordpress/blocks';
import { select } from '@wordpress/data';
import { InnerBlocks } from '@wordpress/block-editor';
import { createElement } from '@wordpress/element';
import reactHtmlParser from 'react-html-parser';

/**
 * Return shared attributes.
 *
 * @param {string} blockName Block name, simple or with namespace.
 * @param {string} namespace Namespace for full block name.
 */
export const getSharedAttributes = (blockName, namespace) => {
	return {
		blockName: {
			type: 'string',
			default: blockName,
		},
		blockFullName: {
			type: 'string',
			default: `${namespace}/${blockName}`,
		},
		blockClass: {
			type: 'string',
			default: `block-${blockName}`,
		},
		blockJsClass: {
			type: 'string',
			default: `js-block-${blockName}`,
		},
	};
};

/**
 * Wrap edit component with wrapper component.
 *
 * @param {function} Component Children callback function.
 * @param {function} Wrapper Wrapper callback function.
 *
 */
export const withWrapper = (Component, Wrapper) => (props) => {
	return (
		<Wrapper props={props}>
			<Component {...props} />
		</Wrapper>
	);
};

/**
 * Map and prepare all options from layout manifest.json file for usage in registerBlockVariation method.
 *
 * @param {object} manifest Layout manifest.json object with data.
 * @param {object} globalManifest Global blocks manifest.json object with namespace.
 *
 */
export const registerVariation = (
	manifest = {},
	globalManifest = {},
) => {
	const {
		namespace,
		parentName,
		blockName,
		attributes = {},
		icon = {},
	} = manifest;

	const {
		namespace: namespaceGlobal,
		background: backgroundGlobal,
		foreground: foregroundGlobal,
	} = globalManifest;

	// Append globalManifest data in to output.
	if (typeof icon !== 'undefined') {
		manifest.icon = {
			background: (typeof icon.background === 'undefined') ? backgroundGlobal : icon.background,
			foreground: (typeof icon.background === 'undefined') ? foregroundGlobal : icon.foreground,
			src: (icon.src.includes('<svg')) ? reactHtmlParser(icon.src)[0] : icon.src,
		};
	}

	// Check if namespace is defined in block or in global manifest settings.
	const namespaceFinal = (typeof namespace === 'undefined') ? namespaceGlobal : namespace;

	// When adding attributes object attributes will not be added but ovveriden. By spreading parent attributes with variation attributes we are able to set everything.
	const parentBlock = select(('core/blocks')).getBlockTypes().filter((item) => item.name === `${namespaceFinal}/${parentName}`);

	if (parentBlock.length) {
		const parentAttributes = parentBlock[0].attributes;

		for (const attribute in parentAttributes) {
			if (parentAttributes.hasOwnProperty(attribute)) {
				if (parentAttributes[attribute].type === 'object' && attributes.hasOwnProperty(attribute)) {
					manifest.attributes[attribute] = {
						...parentAttributes[attribute].default,
						...attributes[attribute],
					};
				}
			}
		}
	}

	return {
		...manifest,
		blockName: `${namespaceFinal}/${parentName}`,
		namespace: namespaceFinal,
		name: blockName,
	};
};

/**
 * Map and prepare all options from block manifest.json file for usage in registerBlockType method.
 *
 * @param {object} manifest Block manifest.json object with data.
 * @param {object} globalManifest Global blocks manifest.json object with namespace.
 * @param {function} edit Edit callback function.
 * @param {function} wrapper Wrapper callback function.
 * @param {object} wrapperManifest Wrappe manifest.json object.
 *
 */
export const registerBlock = (
	manifest = {},
	globalManifest = {},
	edit,
	wrapperComponent,
	wrapperManifest = {},
) => {
	const {
		namespace,
		blockName,
		hasInnerBlocks = false,
		attributes = {},
		icon = {},
	} = manifest;

	const {
		namespace: namespaceGlobal,
		attributes: attributesGlobal,
		background: backgroundGlobal,
		foreground: foregroundGlobal,
	} = globalManifest;

	const {
		attributes: attributesWrapper,
	} = wrapperManifest;

	// Default save method.
	let save = () => null;

	// Append globalManifest data in to output.
	if (typeof icon !== 'undefined') {
		manifest.icon = {
			background: (typeof icon.background === 'undefined') ? backgroundGlobal : icon.background,
			foreground: (typeof icon.background === 'undefined') ? foregroundGlobal : icon.foreground,
			src: (icon.src.includes('<svg')) ? reactHtmlParser(icon.src)[0] : icon.src,
		};
	}

	// Provide different save method for InnerBlocks.
	if (hasInnerBlocks && typeof InnerBlocks !== 'undefined') {
		save = () => createElement(InnerBlocks.Content);
	}

	// Check if namespace is defined in block or in global manifest settings.
	const namespaceFinal = (typeof namespace === 'undefined') ? namespaceGlobal : namespace;

	manifest.attributes = {
		...getSharedAttributes(blockName, namespaceFinal),
		...((typeof attributesGlobal === 'undefined') ? {} : attributesGlobal),
		...((typeof attributesWrapper === 'undefined') ? {} : attributesWrapper),
		...attributes,
	};

	return {
		blockName: `${namespaceFinal}/${blockName}`,
		options: {
			...manifest,
			blockName: `${namespaceFinal}/${blockName}`,
			edit: withWrapper(edit, wrapperComponent),
			save,
		},
	};
};

/**
 * Filter array of JavaScript paths and get the correct edit component.
 *
 * @param {string} blockName Provided block name to find corresponding edit component.
 * @param {function} paths Function of all JavaScript files in a block got from require.context.
 * @param {string} fileName Block partial name.
 *
 */
export const getBlockEditComponent = (blockName, paths, fileName) => {

	// Create an array of all blocks file paths.
	const pathsKeys = paths.keys();

	// Get Block edit component from block name and pathsKeys.
	const editComponent = pathsKeys.filter((filePath) => filePath === `./${blockName}/${blockName}-${fileName}.js`).map(paths)[0];

	// If edit component is missing throw and error.
	if (typeof editComponent === 'undefined') {
		throw Error(`It looks like you are missing block edit component for block: ${blockName}, please check if you have ${blockName}-block.js file in your block folder.`);
	}

	// No mater if class of functional component is used fetch the first item in an object.
	const editCallback = editComponent[Object.keys(editComponent)[0]];

	// If edit component callback is missing throw and error.
	if (typeof editCallback === 'undefined') {
		throw Error(`It looks like you are missing block edit component for block: ${blockName}, please check if you have ${blockName}-block.js file in your block folder.`);
	}

	return editCallback;
};

/**
 * Filter array of JavaScript paths and get the correct transforms component.
 *
 * @param {string} blockName Provided block name to find corresponding edit component.
 * @param {function} paths Function of all JavaScript files in a block got from require.context.
 * @param {string} fileName Block partial name.
 *
 */
export const getBlockGenericComponent = (blockName, paths, fileName) => {

	// Create an array of all blocks file paths.
	const pathsKeys = paths.keys();

	// Get Block edit component from block name and pathsKeys.
	const editComponent = pathsKeys.filter((filePath) => filePath === `./${blockName}/${blockName}-${fileName}.js`).map(paths)[0];

	// If edit component is missing throw and error.
	if (typeof editComponent === 'undefined') {
		return null;
	}

	// No mater if class of functional component is used fetch the first item in an object.
	return editComponent[Object.keys(editComponent)[0]];
};

/**
 * Register all Block Editor blocks using WP registerBlockType method.
 * Due to restrictions in dynamic import using dynamic names all block are register using require.context.
 *
 * @param {object} globalManifest Must provide global blocks setting manifest.json.
 * @param {function} wrapperComponent Wrapper callback function.
 * @param {object} wrapperManifest Wrapper manifest function.
 * @param {function} blocksManifestPath Must provide require.context for all blocks manifest.json-s.
 * @param {function} blocksPaths Must provide require.context for all blocks JavaScript files (unable to add only block edit file due to dynamic naming).
 * @param {function} hooksPath Function of hooks JavaScript files in a block got from require.context.
 * @param {function} transformsPaths Function of transforms JavaScript files in a block got from require.context.
 *
 */
export const registerBlocks = (
	globalManifest = {},
	wrapperComponent = null,
	wrapperManifest = {},
	blocksManifestPath,
	blocksPaths,
	hooksPath = null,
	transformsPaths = null,
) => {

	// Create an array of Block manifests.
	const allBlocksManifestPath = blocksManifestPath.keys().map(blocksManifestPath);

	// Iterate blocks to register.
	allBlocksManifestPath.map((block) => {

		// Get Block edit component from block name and blocksPaths.
		const editCallback = getBlockEditComponent(block.blockName, blocksPaths, 'block');

		// Get Block Transforms component from block name and transformsPaths.
		if (transformsPaths !== null) {
			const transformsCallback = getBlockGenericComponent(block.blockName, transformsPaths, 'transforms');
	
			if (transformsCallback !== null) {
				block.transforms = transformsCallback;
			}
		}

		// Get Block Hooks component from block name and hooksPath.
		if (hooksPath !== null) {
			const hooksCallback = getBlockGenericComponent(block.blockName, hooksPath, 'hooks');

			if (hooksCallback !== null) {
				hooksCallback();
			}
		}

		// Pass data to registerBlock helper to get final output for registerBlockType.
		const blockDetails = registerBlock(
			block,
			globalManifest,
			editCallback,
			wrapperComponent,
			wrapperManifest
		);

		// Native WP method for block registration.
		registerBlockType(blockDetails.blockName, blockDetails.options);

		return null;
	});
};

/**
 * Register all Variations Editor blocks using WP registerBlockVariation method.
 * Due to restrictions in dynamic import using dynamic names all block are register using require.context.
 *
 * @param {object} globalManifest Must provide global blocks setting manifest.json.
 * @param {function} blocksManifestPath Must provide require.context for all blocks manifest.json-s.
 * @param {function} transformsPaths Function of transforms JavaScript files in a block got from require.context.
 *
 */
export const registerVariations = (
	globalManifest = {},
	blocksManifestPath,
	transformsPaths = null,
) => {

	// Create an array of Block manifests.
	const allBlocksManifestPath = blocksManifestPath.keys().map(blocksManifestPath);

	// Iterate blocks to register.
	allBlocksManifestPath.map((block) => {

		// Get Block Transforms component from block name and transformsPaths.
		if (transformsPaths !== null) {
			const transformsCallback = getBlockGenericComponent(block.blockName, transformsPaths, 'transforms');

			if (transformsCallback !== null) {
				block.transforms = transformsCallback;
			}
		}

		// Pass data to registerVariation helper to get final output for registerBlockVariation.
		const blockDetails = registerVariation(
			block,
			globalManifest
		);

		// Native WP method for block registration.
		registerBlockVariation(blockDetails.blockName, blockDetails);

		return null;
	});
};
