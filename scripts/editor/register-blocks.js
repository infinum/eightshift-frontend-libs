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
const getSharedAttributes = (blockName, namespace) => {
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
const withWrapper = (Component, Wrapper) => (props) => {
	return (
		<Wrapper props={props}>
			<Component {...props} />
		</Wrapper>
	);
};

/**
 * Iterate over component object and check if the component exists in the project.
 * Search and replace the component attributes with new one.
 *
 * @param {object} componentsManifest Object of component manifests to iterate.
 * @param {object} components List of all component from block.
 * @param {string} blockName Full block name.
 */
const prepareCommponentAttributes = (componentsManifest, components, blockName) => {
	let output = {};

	for (const newComponentName in components) {
		if (components.hasOwnProperty(newComponentName)) {

			const realComponentName = components[newComponentName];

			const findComponent = componentsManifest.filter((item) => item.componentName === realComponentName);

			if (!findComponent.length) {
				throw `Component specified in "${blockName}" blocks manifest doesn't exist in your components list. Please check if you project has "${realComponentName}" component.`; // eslint-disable-line no-throw-literal
			}

			const componentAttributes = findComponent[0].attributes;

			let outputAttributes = {};

			if (realComponentName !== newComponentName) {
				for (const componentAttribute in componentAttributes) {
					if (componentAttributes.hasOwnProperty(componentAttribute)) {
						const newName = componentAttribute.replace(realComponentName, newComponentName);
			
						outputAttributes[newName] = componentAttributes[componentAttribute];
					}
				}
			} else {
				outputAttributes = componentAttributes;
			}

			output = {
				...output,
				...outputAttributes,
			};
		}
	}

	return output;
};

/**
 * Filter array of JavaScript paths and get the correct edit component.
 *
 * @param {string} blockName Provided block name to find corresponding edit component.
 * @param {function} paths Function of all JavaScript files in a block got from require.context.
 * @param {string} fileName Block partial name.
 *
 */
const getBlockEditComponent = (blockName, paths, fileName) => {

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
const getBlockGenericComponent = (blockName, paths, fileName) => {

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
 * @param {object} globalManifest Global blocks manifest.json object.
 * @param {object} wrapperManifest Wrapper manifest.json object.
 * @param {object} componentsManifest All components manifest.json objects in an single object.
 * @param {object} blockManifest Block manifest.json object with data.
 * @param {function} wrapperComponent Wrapper callback function.
 * @param {function} blockComponent Edit callback function.
 *
 */
export const registerBlock = (
	globalManifest = {},
	wrapperManifest = {},
	componentsManifest = {},
	blockManifest = {},
	wrapperComponent,
	blockComponent
) => {

	const {
		namespace: namespaceGlobal,
		attributes: attributesGlobal,
		background: backgroundGlobal,
		foreground: foregroundGlobal,
	} = globalManifest;

	const {
		attributes: attributesWrapper,
	} = wrapperManifest;

	const {
		namespace,
		blockName,
		hasInnerBlocks = false,
		attributes = {},
		icon = {},
		components = {},
	} = blockManifest;

	const manifest = {};

	// Append globalManifest data in to output.
	if (typeof icon !== 'undefined') {
		manifest.icon = {
			background: (typeof icon.background === 'undefined') ? backgroundGlobal : icon.background,
			foreground: (typeof icon.background === 'undefined') ? foregroundGlobal : icon.foreground,
			src: (icon.src.includes('<svg')) ? reactHtmlParser(icon.src)[0] : icon.src,
		};
	}
	
	// Default save method.
	let save = () => null;
	
	// Provide different save method for InnerBlocks.
	if (hasInnerBlocks && typeof InnerBlocks !== 'undefined') {
		save = () => createElement(InnerBlocks.Content);
	}

	// Check if namespace is defined in block or in global manifest settings.
	const namespaceFinal = (typeof namespace === 'undefined') ? namespaceGlobal : namespace;

	// This is a full block name used in Block Editor.
	const fullBlockName = `${namespaceFinal}/${blockName}`;

	// Set full attributes list.
	blockManifest.attributes = {
		...getSharedAttributes(blockName, namespaceFinal),
		...((typeof attributesGlobal === 'undefined') ? {} : attributesGlobal),
		...((typeof attributesWrapper === 'undefined') ? {} : attributesWrapper),
		...prepareCommponentAttributes(componentsManifest, components, fullBlockName),
		...attributes,
	};

	return {
		blockName: fullBlockName,
		options: {
			...blockManifest,
			blockName: fullBlockName,
			edit: withWrapper(blockComponent, wrapperComponent),
			save,
		},
	};
};

/**
 * Register all Block Editor blocks using WP registerBlockType method.
 * Due to restrictions in dynamic import using dynamic names all block are register using require.context.
 *
 * @param {object} globalManifest Must provide global blocks setting manifest.json.
 * @param {function} wrapperComponent Wrapper callback function.
 * @param {object} wrapperManifest Wrapper manifest function.
 * @param {function} blocksManifestPath Must provide require.context for all blocks manifest.json-s.
 * @param {function} blocksEditComponentPath Must provide require.context for all blocks JavaScript files (unable to add only block edit file due to dynamic naming).
 * @param {function} hooksComponentPath Function of hooks JavaScript files in a block got from require.context.
 * @param {function} transformsComponentPath Function of transforms JavaScript files in a block got from require.context.
 *
 */
export const registerBlocks = (
	globalManifest = {},
	wrapperComponent = null,
	wrapperManifest = {},
	componentsManifestPath,
	blocksManifestPath,
	blocksEditComponentPath,
	hooksComponentPath = null,
	transformsComponentPath = null,
) => {

	// Iterate blocks to register.
	blocksManifestPath.keys().map(blocksManifestPath).map((blockManifest) => {

		// Get Block edit component from block name and blocksEditComponentPath.
		const blockComponent = getBlockEditComponent(blockManifest.blockName, blocksEditComponentPath, 'block');

		// Get Block Transforms component from block name and transformsComponentPath.
		if (transformsComponentPath !== null) {
			const blockTransformsComponent = getBlockGenericComponent(blockManifest.blockName, transformsComponentPath, 'transforms');
	
			if (blockTransformsComponent !== null) {
				blockManifest.transforms = blockTransformsComponent;
			}
		}

		// Get Block Hooks component from block name and hooksComponentPath.
		if (hooksComponentPath !== null) {
			const blockHooksComponent = getBlockGenericComponent(blockManifest.blockName, hooksComponentPath, 'hooks');

			if (blockHooksComponent !== null) {
				blockHooksComponent();
			}
		}

		const componentsManifest = componentsManifestPath.keys().map(componentsManifestPath);

		// Pass data to registerBlock helper to get final output for registerBlockType.
		const blockDetails = registerBlock(
			globalManifest,
			wrapperManifest,
			componentsManifest,
			blockManifest,
			wrapperComponent,
			blockComponent
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
 * @param {function} transformsComponentPath Function of transforms JavaScript files in a block got from require.context.
 *
 */
export const registerVariations = (
	globalManifest = {},
	blocksManifestPath,
	transformsComponentPath = null,
) => {

	// Create an array of Block manifests.
	const allBlocksManifestPath = blocksManifestPath.keys().map(blocksManifestPath);

	// Iterate blocks to register.
	allBlocksManifestPath.map((block) => {

		// Get Block Transforms component from block name and transformsComponentPath.
		if (transformsComponentPath !== null) {
			const transformsCallback = getBlockGenericComponent(block.blockName, transformsComponentPath, 'transforms');

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
