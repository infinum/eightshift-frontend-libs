import React from 'react';
import _ from 'lodash';
import { registerBlockType, registerBlockVariation } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';
import { createElement } from '@wordpress/element';
import reactHtmlParser from 'react-html-parser';
import { blockIcons } from './icons/icons';

/**
 * Filter array of JS paths and get the correct edit components.
 *
 * @param {string} blockName - Provided block name to find corresponding edit component.
 * @param {function} paths   - Function of all JavaScript files in a block got from require.context.
 * @param {string} fileName  - Block partial name.
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
 * Filter array of JS paths and get the correct transforms, hooks, etc components.
 *
 * @param {string} blockName - Provided block name to find corresponding edit component.
 * @param {function} paths   - Function of all JavaScript files in a block got from require.context.
 * @param {string} fileName  - Block partial name.
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
 * Check if namespace is defined in block or in global manifest settings and return namespace.
 *
 * @param {object} globalManifest - Global manifest.
 * @param {object} blockManifest  - Block manifest.
 * 
 * @returns {string?}
 */
export const getNamespace = (globalManifest, blockManifest) => {
	return (typeof blockManifest.namespace === 'undefined') ? globalManifest.namespace : blockManifest.namespace;
};

/**
 * Return full block name used in Block Editor with correct namespace.
 *
 * @param {object} globalManifest - Global manifest.
 * @param {object} blockManifest  - Block manifest.
 * 
 * @returns {string}
 */
export const getFullBlockName = (globalManifest, blockManifest) => {
	return `${getNamespace(globalManifest, blockManifest)}/${blockManifest.blockName}`;
};

/**
 * Return full block name used in Block Editor with correct namespace.
 *
 * @param {object} globalManifest - Global manifest.
 * @param {object} blockManifest  - Block manifest.
 * 
 * @returns {string}
 */
export const getFullBlockNameVariation = (globalManifest, blockManifest) => {
	return `${getNamespace(globalManifest, blockManifest)}/${blockManifest.parentName}`;
};

/**
 * Return save function based on hasInnerBlocks option of block.
 *
 * @param {object} blockManifest - Block manifest.
 * 
 * @returns {function} Save callback.
 */
export const getSaveCallback = (blockManifest) => {
	const {
		hasInnerBlocks,
	} = blockManifest;

	if (hasInnerBlocks && typeof InnerBlocks !== 'undefined') {
		return () => createElement(InnerBlocks.Content);
	}

	return () => null;
};

/**
 * Return merge function based on existence of `mergeableAttributes` option of block.
 *
 * @param {object} blockManifest - Block manifest.
 */
export const getMergeCallback = (blockManifest) => {
	const {
		mergeableAttributes,
	} = blockManifest;

	if (mergeableAttributes) {
		return (receiver, merger) => {
			let outputObject = {};

			for (const { attribute, mergeStrategy } of mergeableAttributes) {
				switch (mergeStrategy) {
					case "append": {
						outputObject[attribute] = `${receiver[attribute] ?? ''}${merger[attribute] ?? ''}`;
						break;
					}
					case "useDestinationAttribute": {
						outputObject[attribute] = merger[attribute] ?? ''
						break;
					}
					case "addNumericIntValue": {
						outputObject[attribute] = parseInt(receiver[attribute] ?? '0') + parseInt(merger[attribute] ?? '0');
						break;
					}
					case "addNumericFloatValue": {
						outputObject[attribute] = parseFloat(receiver[attribute] ?? '0') + parseFloat(merger[attribute] ?? '0');
						break;
					}
					/* eslint-disable no-case-declarations */
					case "addNumericPixelValue": {
						// Remove numbers
						const receiverUnit = (receiver[attribute] ?? '0px').replace(/\d/g, '');

						// Remove value labels (= everything but numbers)
						const receiverValue = parseInt(receiver[attribute] ?? '0px').replace(/\D/g, '');
						const mergerValue = parseInt(receiver[attribute] ?? '0px').replace(/\D/g, '');
						const calculatedValue = receiverValue + mergerValue;

						outputObject[attribute] = `${calculatedValue}${receiverUnit}`
						break;
					}
					/* eslint-enable no-case-declarations */
					default: {
						// "useSourceAttribute" is default
						outputObject[attribute] = receiver[attribute] ?? ''
						break;
					}
				}
			}

			return outputObject;
		};
	}

	return () => null;
};

/**
 * Return edit function wrapped with Wrapper component.
 *
 * @param {React.Component} Component - Component to render inside the wrapper.
 * @param {React.Component} Wrapper   - Wrapper component.
 *
 * @returns {React.Component}
 */
export const getEditCallback = (Component, Wrapper) => (props) => {
	return (
		<Wrapper props={props}>
			<Component {...props} />
		</Wrapper>
	);
};

/**
 * Set icon object with icon, background and foreground.
 *
 * @param {object} globalManifest - Global manifest.
 * @param {object} blockManifest  - Block manifest.
 * 
 * @returns {object}
 */
export const getIconOptions = (globalManifest, blockManifest) => {
	const {
		background: backgroundGlobal,
		foreground: foregroundGlobal,
	} = globalManifest;

	const {
		icon,
	} = blockManifest;

	if (typeof icon === 'undefined') {
		return {};
	}

	// Use built-in icons if 'src' is provided and the
	// icon exists in the library
	if (icon.src !== undefined && blockIcons[icon.src] !== undefined) {
		return {
			background: (typeof icon.background === 'undefined') ? backgroundGlobal : icon.background,
			foreground: (typeof icon.foreground === 'undefined') ? foregroundGlobal : icon.foreground,
			src: reactHtmlParser(blockIcons[icon.src])[0],
		}
	}

	return {
		background: (typeof icon.background === 'undefined') ? backgroundGlobal : icon.background,
		foreground: (typeof icon.foreground === 'undefined') ? foregroundGlobal : icon.foreground,
		src: (icon.src.includes('<svg')) ? reactHtmlParser(icon.src)[0] : icon.src,
	};
};

/**
 * Return shared attributes.
 *
 * @param {object} globalManifest - Global manifest.
 * @param {object} blockManifest  - Block manifest.
 * 
 * @returns {object}
 */
export const getSharedAttributes = (globalManifest, blockManifest) => {
	const {
		blockName,
	} = blockManifest;

	return {
		blockName: {
			type: 'string',
			default: blockName,
		},
		blockFullName: {
			type: 'string',
			default: getFullBlockName(globalManifest, blockManifest),
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
 * Iterate over component object in block manifest and search and replace the component attributes with new one.
 * Search and replace the component attributes with new one.
 *
 * @param {object} component         - Object of component manifests to iterate.
 * @param {string} realComponentName - React component name defined in the component manifest.
 * @param {string} newComponentName  - New component name to search and replace the original.
 * @param {string} [key=attributes]  - Type of output, can be: `attributes` or `example`.
 * 
 * @returns {object}
 */
export const prepareComponentAttribute = (component, realComponentName, newComponentName, key = 'attributes') => {
	let output = {};

	let componentAttributes = {};

	// Define different data point for attributes.
	if (key === 'attributes') {
		componentAttributes = component.attributes;
	}

	// Define different data point for example.
	if (key === 'example') {
		componentAttributes = component.example.attributes;
	}

	// Check if realComponentName and newComponentName are not the same. If so do the replace of the attribute names.
	if (realComponentName !== newComponentName) {

		// Loop attributes that need replacing.
		for (const [componentAttribute] of Object.entries(componentAttributes)) {
			const newName = componentAttribute.replace(realComponentName, newComponentName);

			// Output attributes with the new name.
			output[newName] = componentAttributes[componentAttribute];
		}
	} else {
		output = componentAttributes;
	}

	return output;
};

/**
 * Iterate over component object in block manifest and check if the component exists in the project.
 * If components contains more component this function will run recursively.
 *
 * @param {object} componentsManifest              - Object of component manifests to iterate.
 * @param {object} blockManifest                   - Object of blocks manifests to iterate.
 * @param {string} blockName                       - Full block name.
 * @param {string} [key=attributes]                - Type of output, can be: `attributes` or `example`.
 * @param {string} [parentAttributeName=undefined] - Parent component attribute from which to determine if the name has changed in the parent component.
 * 
 * @returns {object}
 */
export const prepareComponentAttributes = (componentsManifest, blockManifest, blockName, key = 'attributes', parentAttributeName = undefined) => {
	let output = {};

	const {
		components = {},
		attributes = {},
		example = {},
	} = blockManifest;

	// Loop component.
	for (let [newComponentName, realComponentName] of Object.entries(components)) {

		// Filter components real name.
		const [component] = componentsManifest.filter((item) => item.componentName === realComponentName);

		// Bailout if component doesn't exist.
		if (!component) {
			throw Error(`Component specified in "${blockName}" blocks manifest doesn't exist in your components list. Please check if you project has "${realComponentName}" component.`);
		}

		let outputAttributes = {};

		// If component has more components do recursive loop.
		if (Object.prototype.hasOwnProperty.call(component, 'components')) {
			outputAttributes = prepareComponentAttributes(componentsManifest, component, blockName, key, newComponentName);
		} else {

			// Use parent attribute name to determine if the name has changed in the parent component.
			if (parentAttributeName !== newComponentName && realComponentName !== newComponentName) {
				newComponentName = parentAttributeName;
			}

			// Output the component attributes.
			outputAttributes = prepareComponentAttribute(component, realComponentName, newComponentName, key);
		}

		output = {
			...output,
			...outputAttributes,
			...(key === 'attributes' ? attributes : example.attributes),
		};
	}

	return output;
};

/**
 * Get Block attributes combined in one: "shared, global, wrapper, components, block".
 *
 * @param {object} globalManifest     - Global manifest.
 * @param {object} wrapperManifest    - `Wrapper` manifest.
 * @param {object} componentsManifest - Component manifest to iterate through.
 * @param {object} blockManifest      - Block manifest.
 * 
 * @returns {object}
 */
export const getAttributes = (globalManifest, wrapperManifest, componentsManifest, blockManifest) => {
	const {
		attributes: attributesGlobal,
	} = globalManifest;

	const {
		attributes: attributesWrapper,
	} = wrapperManifest;

	const {
		attributes = {},
	} = blockManifest;

	return {
		...getSharedAttributes(globalManifest, blockManifest),
		...((typeof attributesGlobal === 'undefined') ? {} : attributesGlobal),
		...((typeof attributesWrapper === 'undefined') ? {} : attributesWrapper),
		...prepareComponentAttributes(componentsManifest, blockManifest, getFullBlockName(globalManifest, blockManifest)),
		...attributes,
	};
};

/**
 * Get Block example attributes combined in one: "components and block".
 *
 * @param {object} globalManifest     - Global manifest.
 * @param {object} componentsManifest - Component manifest to iterate through.
 * @param {object} blockManifest      - Block manifest.
 * 
 * @returns {object}
 */
export const getExample = (globalManifest, componentsManifest, blockManifest) => {
	const {
		example = {},
	} = blockManifest;

	return {
		...prepareComponentAttributes(componentsManifest, blockManifest, getFullBlockName(globalManifest, blockManifest), 'example'),
		...example.attributes,
	};
};

/**
 * Map and prepare all options from block manifest.json file for usage in registerBlockVariation method.
 *
 * @param {object} globalManifest - Global manifest.
 * @param {object} blockManifest  - Block manifest.
 *
 * @returns {object}
 */
export const registerVariation = (
	globalManifest = {},
	blockManifest = {},
) => {

	// Append globalManifest data in to output.
	blockManifest['icon'] = getIconOptions(globalManifest, blockManifest);

	// This is a full block name used in Block Editor.
	const fullBlockName = getFullBlockNameVariation(globalManifest, blockManifest);

	return {
		blockName: fullBlockName,
		options: {
			...blockManifest,
			blockName: fullBlockName,
		},
	};
};

/**
 * Map and prepare all options from block manifest.json file for usage in registerBlockType method.
 *
 * @param {object} globalManifest     - Global manifest.
 * @param {object} wrapperManifest    - `Wrapper` manifest.
 * @param {object} componentsManifest - Manifest of all components in a single object.
 * @param {object} blockManifest      - Block manifest.
 * @param {function} wrapperComponent - Callback function that returns a `Wrapper`.
 * @param {function} blockComponent   - Edit callback function.
 *
 * @returns {object}
 */
export const registerBlock = (
	globalManifest = {},
	wrapperManifest = {},
	componentsManifest = {},
	blockManifest = {},
	wrapperComponent,
	blockComponent
) => {

	// Block Icon option.
	blockManifest['icon'] = getIconOptions(globalManifest, blockManifest);

	// This is a full block name used in Block Editor.
	const fullBlockName = getFullBlockName(globalManifest, blockManifest);

	// Set full attributes list.
	blockManifest['attributes'] = getAttributes(globalManifest, wrapperManifest, componentsManifest, blockManifest);

	// Set full example list.
	if (typeof blockManifest['example'] === 'undefined') {
		blockManifest['example'] = {};
	}

	// Set full examples list.
	blockManifest['example'].attributes = getExample(globalManifest, componentsManifest, blockManifest);

	return {
		blockName: fullBlockName,
		options: {
			...blockManifest,
			blockName: fullBlockName,
			edit: getEditCallback(blockComponent, wrapperComponent),
			save: getSaveCallback(blockManifest),
			merge: getMergeCallback(blockManifest),
		},
	};
};

/**
 * Register all Block Editor blocks using WP `registerBlockType` method.
 * Due to restrictions in dynamic import using dynamic names all blocks are registered using `require.context`.
 *
 * @param {object} globalManifest               - Must provide global blocks setting manifest.json.
 * @param {function?} [wrapperComponent]        - Callback function that returns a `Wrapper`.
 * @param {object} wrapperManifest              - `Wrapper` manifest.
 * @param {function} componentsManifestPath     - **Must provide `require.context` for all components `manifest.json`s.**
 * @param {function} blocksManifestPath         - **Must provide `require.context` for all blocks manifest.json-s.**
 * @param {function} blocksEditComponentPath    - **Must provide `require.context` for all blocks JavaScript files (unable to add only block edit file due to dynamic naming).**
 * @param {function?} [hooksComponentPath]      - Function of hooks JavaScript files in a block from `require.context`.
 * @param {function?} [transformsComponentPath] - Function of transforms JavaScript files in a block from `require.context`.
 *
 * @returns {mixed}
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

	const componentsManifest = componentsManifestPath.keys().map(componentsManifestPath);

	const blocksManifests = [];

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

		blocksManifests.push(blockManifest);

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

	buildWindowObject(globalManifest, componentsManifest, blocksManifests, wrapperManifest);

	// Add icon foreground and background colors as CSS variables for later use.
	const {
		background: backgroundGlobal,
		foreground: foregroundGlobal,
	} = globalManifest;

	document.documentElement.style.setProperty('--eightshift-block-icon-foreground', foregroundGlobal);
	document.documentElement.style.setProperty('--eightshift-block-icon-background', backgroundGlobal);
};

/**
 * Build global window object used for optimization.
 *
 * @param {object} globalManifest    - Global setting manifest.
 * @param {array} componentsManifest - List of all component manifests.
 * @param {array} blocksManifests    - List of all block manifests.
 * @param {object} wrapperManifest   - `Wrapper` manifest.
 */
export const buildWindowObject = (globalManifest, componentsManifest, blocksManifests, wrapperManifest) => {
	window['eightshift'] = {
		[globalManifest['namespace']]: {
			dependency: {
				components: buildDependencyComponentsTree(componentsManifest),
				blocks: buildDependencyBlocksTree(blocksManifests, componentsManifest),
			},
			blocks: blocksManifests,
			components: componentsManifest,
			wrapper: wrapperManifest,
			settings: globalManifest,
		},
	};
}

/**
 * Build components dependency tree for blocks.
 *
 * @param {object} blocks     - List of all blocks.
 * @param {object} components - List of all components
 *
 * @returns {object}
 */
export const buildDependencyBlocksTree = (blocks, components) => {
	const output = {};

	blocks.forEach((item) => {
		output[item.blockName] = _.uniq(buildDependencyComponentsInnerTree(item.components, components));
	});

	return output;
}

/**
 * Build components dependency tree for components.
 *
 * @param {object} components - List of all components
 *
 * @returns {object}
 */
export const buildDependencyComponentsTree = (components) => {
	const output = {};

	components.forEach((item) => {
		output[item.componentName] = _.uniq(buildDependencyComponentsInnerTree(item.components, components));
	});

	return output;
}

/**
 * Build inner recursive dependency tree for components.
 *
 * @param {Object} componentsList - List of components to check.
 * @param {Object} components     - List of all components,
 *
 * @returns {array}
 */
export const buildDependencyComponentsInnerTree = (componentsList, components) => {
	let output = [];

	if (typeof componentsList === 'undefined') {
		return output;
	}

	for (const [key, value] of Object.entries(componentsList)) {
		const items = components.filter((item) => item.componentName === value)[0].components;
		output.push(key);

		if (typeof items !== 'undefined') {
			output.push(buildDependencyComponentsInnerTree(items, components));
		}
	}

	return _.flattenDeep(output);
}

/**
 * Register all Variations Editor blocks using WP `registerBlockVariation` method.
 * Due to restrictions in dynamic import using dynamic names all block are register using `require.context`.
 *
 * @param {object} globalManifest       - **Must provide global blocks setting `manifest.json`.**
 * @param {function} blocksManifestPath - **Must provide require.context for all block `manifest.json`s.**
 *
 * @returns {null}
 */
export const registerVariations = (
	globalManifest = {},
	blocksManifestPath,
) => {

	// Iterate blocks to register.
	blocksManifestPath.keys().map(blocksManifestPath).map((blockManifest) => {

		// Pass data to registerVariation helper to get final output for registerBlockVariation.
		const blockDetails = registerVariation(
			globalManifest,
			blockManifest
		);

		// Native WP method for block registration.
		registerBlockVariation(blockDetails.blockName, blockDetails.options);

		return null;
	});
};
