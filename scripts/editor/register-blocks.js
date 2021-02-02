import React from 'react';
import { registerBlockType, registerBlockVariation } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';
import { createElement } from '@wordpress/element';
import reactHtmlParser from 'react-html-parser';

/**
 * Filter array of JS paths and get the correct edit components.
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
 * Filter array of JS paths and get the correct transforms, hooks, etc components.
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
 * Check if namespace is defined in block or in global manifest settings and return namespace.
 *
 * @param {object} globalManifest Blocks global shared manifest.
 * @param {object} blockManifest Block full manifest.
 */
export const getNamespace = (globalManifest, blockManifest) => {
	return (typeof blockManifest.namespace === 'undefined') ? globalManifest.namespace : blockManifest.namespace;
};

/**
 * Return full block name used in Block Editor with correct namespace.
 *
 * @param {object} globalManifest Blocks global shared manifest.
 * @param {object} blockManifest Block full manifest.
 */
export const getFullBlockName = (globalManifest, blockManifest) => {
	return `${getNamespace(globalManifest, blockManifest)}/${blockManifest.blockName}`;
};

/**
 * Return full block name used in Block Editor with correct namespace.
 *
 * @param {object} globalManifest Blocks global shared manifest.
 * @param {object} blockManifest Block full manifest.
 */
export const getFullBlockNameVariation = (globalManifest, blockManifest) => {
	return `${getNamespace(globalManifest, blockManifest)}/${blockManifest.parentName}`;
};

/**
 * Return save function based on hasInnerBlocks option of block.
 *
 * @param {object} blockManifest Block full manifest.
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
 * Return edit function wrapped with Wrapper component.
 *
 * @param {function} Component Children callback function.
 * @param {function} Wrapper Wrapper callback function.
 *
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
 * @param {object} globalManifest Blocks global shared manifest.
 * @param {object} blockManifest Block full manifest.
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

	return {
		background: (typeof icon.background === 'undefined') ? backgroundGlobal : icon.background,
		foreground: (typeof icon.background === 'undefined') ? foregroundGlobal : icon.foreground,
		src: (icon.src.includes('<svg')) ? reactHtmlParser(icon.src)[0] : icon.src,
	};
};

/**
 * Return shared attributes.
 *
 * @param {object} globalManifest Blocks global shared manifest.
 * @param {object} blockManifest Block full manifest.
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
 * @param {object} component Object of component manifests to iterate.
 * @param {string} realComponentName React component name defined in the component manifest.
 * @param {string} newComponentName New component name to search and replace the original.
 * @param {string} key Change output, can be: "attributes" or "example".
 */
export const prepareComponentAttribute = (component, realComponentName, newComponentName, key = 'attributes') => {
	let output = {};

	let componentAttributes = {};

	if (key === 'attributes') {
		componentAttributes = component.attributes;
	}

	if (key === 'example') {
		componentAttributes = component.example.attributes;
	}

	if (realComponentName !== newComponentName) {
		for (const componentAttribute in componentAttributes) {
			if (Object.prototype.hasOwnProperty.call(componentAttributes, componentAttribute)) {
				const newName = componentAttribute.replace(realComponentName, newComponentName);

				output[newName] = componentAttributes[componentAttribute];
			}
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
 * @param {object} componentsManifest Object of component manifests to iterate.
 * @param {object} blockManifest Object of blocks manifests to iterate.
 * @param {string} blockName Full block name.
 * @param {string} key Change output, can be: "attributes" or "example".
 */
export const prepareComponentAttributes = (componentsManifest, blockManifest, blockName, key = 'attributes') => {
	let output = {};

	const {
		components = {},
		attributes = {},
		example = {},
	} = blockManifest;

	for (const newComponentName in components) {
		if (Object.prototype.hasOwnProperty.call(components, newComponentName)) {

			const realComponentName = components[newComponentName];

			const [component] = componentsManifest.filter((item) => item.componentName === realComponentName);

			if (!component) {
				throw Error(`Component specified in "${blockName}" blocks manifest doesn't exist in your components list. Please check if you project has "${realComponentName}" component.`);
			}

			let outputAttributes = {};

			if (Object.prototype.hasOwnProperty.call(component, 'components')) {
				outputAttributes = prepareComponentAttributes(componentsManifest, component, blockName, key);
			} else {
				outputAttributes = prepareComponentAttribute(component, realComponentName, newComponentName, key);
			}

			output = {
				...output,
				...outputAttributes,
				...(key === 'attributes' ? attributes : example.attributes),
			};
		}
	}

	return output;
};

/**
 * Get Block attributes combined in one: "shared, global, wrapper, components, block".
 *
 * @param {object} globalManifest Blocks global shared manifest.
 * @param {object} wrapperManifest Wrapper full manifest.
 * @param {object} componentsManifest Object of component manifests to iterate.
 * @param {object} blockManifest Block full manifest.
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
 * @param {object} globalManifest Blocks global shared manifest.
 * @param {object} componentsManifest Object of component manifests to iterate.
 * @param {object} blockManifest Block full manifest.
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
 * @param {object} globalManifest Global blocks manifest.json object with namespace.
 * @param {object} blockManifest Block manifest.json object with data.
 *
 */
export const registerVariation = (
	globalManifest = {},
	blockManifest = {},
) => {

	// Append globalManifest data in to output.
	blockManifest.icon = getIconOptions(globalManifest, blockManifest);

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

	// Block Icon option.
	blockManifest.icon = getIconOptions(globalManifest, blockManifest);

	// This is a full block name used in Block Editor.
	const fullBlockName = getFullBlockName(globalManifest, blockManifest);

	// Set full attributes list.
	blockManifest.attributes = getAttributes(globalManifest, wrapperManifest, componentsManifest, blockManifest);

	// Set full example list.
	if (typeof blockManifest.example === 'undefined') {
		blockManifest.example = {};
	}

	blockManifest.example.attributes = getExample(globalManifest, componentsManifest, blockManifest);

	return {
		blockName: fullBlockName,
		options: {
			...blockManifest,
			blockName: fullBlockName,
			edit: getEditCallback(blockComponent, wrapperComponent),
			save: getSaveCallback(blockManifest),
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
 * @param {function} componentsManifestPath Must provide require.context for all components manifest.json-s.
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
 *
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
