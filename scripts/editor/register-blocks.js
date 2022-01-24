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
 * Filter array of JS paths and get the correct transforms, hooks, etc components.
 *
 * @param {string} blockName - Provided block name to find corresponding edit component.
 * @param {function} paths   - Function of all JavaScript files in a block got from require.context.
 * @param {string} fileName  - Block partial name.
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
 * Check if namespace is defined in block or in global manifest settings and return namespace.
 *
 * @param {object} globalManifest - Global manifest.
 * @param {object} blockManifest  - Block manifest.
 * 
 * @returns {string?}
 */
const getNamespace = (globalManifest, blockManifest) => {
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
const getSaveCallback = (blockManifest) => {
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
const getMergeCallback = (blockManifest) => {
	const {
		mergeableAttributes,
	} = blockManifest;

	if (mergeableAttributes) {
		return (receiver, merger) => {
			let outputObject = {};

			for (const { attribute: attributeName, mergeStrategy } of mergeableAttributes) {
				const attribute = Object.keys(receiver).find((k) => {
					return k?.toLowerCase()?.includes(attributeName.toLowerCase());
				});

				switch (mergeStrategy) {
					case "append": {
						outputObject[attribute] = `${receiver[attribute] ?? ''}${merger[attribute] ?? ''}`;
						break;
					}
					case "useDestinationAttribute": {
						outputObject[attribute] = merger[attribute] ?? '';
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

						outputObject[attribute] = `${calculatedValue}${receiverUnit}`;
						break;
					}
					/* eslint-enable no-case-declarations */
					default: {
						// "useSourceAttribute" is default
						outputObject[attribute] = receiver[attribute] ?? '';
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
const getEditCallback = (Component, Wrapper) => (props) => {
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
const getIconOptions = (
	globalManifest,
	blockManifest
) => {

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
		};
	}

	return {
		background: (typeof icon.background === 'undefined') ? backgroundGlobal : icon.background,
		foreground: (typeof icon.foreground === 'undefined') ? foregroundGlobal : icon.foreground,
		src: (icon.src.includes('<svg')) ? reactHtmlParser(icon.src)[0] : icon.src,
	};
};

/**
 * Iterate over attributes or example attributes object in block/component manifest and append the parent prefixes.
 *
 * @param {object} manifest                   - Object of component/block manifest to get data from.
 * @param {string} newName                    - New renamed component name.
 * @param {string} realName                   - Original real component name.
 * @param {boolean} [isExample=false]         - Type of items to iterate, if false example key will be use, if true attributes will be used.
 * @param {string} [parent='']                - Parent component key with stacked parent component names for the final output.
 * @param {boolean} [currentAttributes=false] - Check if current attribute is a part of the current component.
 * 
 * @returns {object}
 */
const prepareComponentAttribute = (manifest, newName, realName, isExample = false, parent = '', currentAttributes = false) => {
	const output = {};

	// Define different data point for attributes or example.
	const componentAttributes = isExample ? manifest?.example?.attributes : manifest?.attributes;

	// It can occur that attributes or example key is missing in manifest so bailout.
	if (typeof componentAttributes === 'undefined') {
		return output;
	}

	// Prepare parent case.
	const newParent = _.camelCase(parent);

	// Iterate each attribute and attach parent prefixes.
	for (const [componentAttribute] of Object.entries(componentAttributes)) {

		let attribute = componentAttribute;

		// If there is a attribute name switch use the new one.
		if (newName !== realName) {
			attribute = componentAttribute.replace(realName, newName);
		}

		// Check if current attribute is used strip component prefix from attribute and replace it with parent prefix.
		if (currentAttributes) {
			attribute = componentAttribute.replace(`${_.lowerFirst(_.camelCase(realName))}`, '');
		}

		// Wrapper attributes that should not be modified.
		const isWrapperAttribute = attribute.startsWith('wrapper') || attribute.startsWith('showWrapper');

		// Determine if parent is empty and if parent name is the same as component/block name and skip wrapper attributes.
		let attributeName = isWrapperAttribute ? attribute : `${newParent}${_.upperFirst(attribute)}`;

		// Output new attribute names.
		output[attributeName] = componentAttributes[componentAttribute];
	}

	return output;
};

/**
 * Iterate over component object in block manifest and check if the component exists in the project.
 * If components contains more component this function will run recursively.
 *
 * @param {object} componentsManifest - Object of components manifest to iterate.
 * @param {object} manifest           - Object of component/block manifest to get the data from.
 * @param {boolean} [isExample=false] - Type of items to iterate, if true example key will be used, if false attributes will be used.
 * @param {string} [parent='']        - Parent component key with stacked parent component names for the final output.
 * 
 * @returns {object}
 */
const prepareComponentAttributes = (
	componentsManifest,
	manifest,
	isExample = false,
	parent = ''
) => {
	const output = {};

	const {
		components = {},
	} = manifest;

	// Determine if this is component or block and provide the name, not used for anything important but only to output the error msg.
	const name = Object.prototype.hasOwnProperty.call(manifest, 'blockName') ? manifest.blockName : manifest.componentName;

	const newParent = (parent === '') ? name : parent;

	// Iterate over components key in manifest recursively and check component names.
	for (let [newComponentName, realComponentName] of Object.entries(components)) {

		// Filter components real name.
		const [component] = componentsManifest.filter((item) => item.componentName === _.kebabCase(realComponentName));

		// Bailout if component doesn't exist.
		if (!component) {
			throw Error(`Component specified in "${name}" manifest doesn't exist in your components list. Please check if you project has "${realComponentName}" component.`);
		}

		let outputAttributes = {};

		// If component has more components do recursive loop.
		if (Object.prototype.hasOwnProperty.call(component, 'components')) {
			outputAttributes = prepareComponentAttributes(componentsManifest, component, isExample, `${newParent}${_.upperFirst(_.camelCase(newComponentName))}`);
		} else {
			// Output the component attributes if there is no nesting left, and append the parent prefixes.
			outputAttributes = prepareComponentAttribute(component, newComponentName, realComponentName, isExample, newParent);
		}

		// Populate the output recursively.
		Object.assign(
			output,
			{
				...output,
				...outputAttributes,
			}
		);
	}

	// Add the current block/component attributes to the output.
	Object.assign(output, prepareComponentAttribute(manifest, '', name, isExample, newParent, true));

	return output;
};

/**
 * Get Block attributes combined in one: "shared, global, wrapper, components, block".
 *
 * @param {object} globalManifest     - Global manifest.
 * @param {object} wrapperManifest    - `Wrapper` manifest.
 * @param {object} componentsManifest - Component manifest to iterate through.
 * @param {object} parentManifest     - Block or component (parent) manifest.
 * 
 * @returns {object} Object of all attributes registered for a specific block.
 *
 * Usage:
 * ```js
 * getAttributes(globalManifest, wrapperManifest, componentManifests, manifest)
 * ```
 */
export const getAttributes = (
	globalManifest,
	wrapperManifest,
	componentsManifest,
	parentManifest
) => {
	const {
		blockName,
	} = parentManifest;

	const {
		attributes: attributesGlobal,
		blockClassPrefix = 'block',
	} = globalManifest;

	const {
		attributes: attributesWrapper,
	} = wrapperManifest;

	const output = {
		blockName: {
			type: 'string',
			default: blockName,
		},
		blockFullName: {
			type: 'string',
			default: getFullBlockName(globalManifest, parentManifest),
		},
		blockClass: {
			type: 'string',
			default: `${blockClassPrefix}-${blockName}`,
		},
		blockJsClass: {
			type: 'string',
			default: `js-${blockClassPrefix}-${blockName}`,
		},
		...((typeof attributesGlobal === 'undefined') ? {} : attributesGlobal),
		...((typeof attributesWrapper === 'undefined') ? {} : attributesWrapper),
		...prepareComponentAttributes(componentsManifest, parentManifest),
	};

	return output;
};

/**
 * Get Block example attributes combined in one: "components and block".
 *
 * @param {object} manifest    - Block/component manifest.
 * @param {string} [parent=''] - Parent component key with stacked parent component names for the final output.
 * 
 * @returns {object}
 *
 * Manifest:
 * ```js
 * {
 *   attributes: {
 *     buttonUse: {
 *       type: "string",
 *       default: true
 *     },
 *     buttonSize: {
 *       type: "string",
 *       default: "big"
 *     },
 *     buttonContent: {
 *       type: "string"
 *     },
 *   }
 * }
 * ```
 *
 * Usage:
 * ```js
 * getExample('button', manifest);
 * ```
 *
 * Output:
 * ```js
 * {
 *   "buttonUse": true,
 *   "buttonSize": "big",
 *   "buttonContent": "",
 * }
 * ```
 */
export const getExample = (
	parent = '',
	manifest = {}
) => {

	return prepareComponentAttributes(getComponentsManifest(), manifest, true, parent);
};

/**
 * Map and prepare all options from block manifest.json file for usage in registerBlockVariation method.
 *
 * @param {object} globalManifest    - Global manifest.
 * @param {object} variationManifest - Variation manifest.
 * @param {Array} blocksManifest     - Blocks manifests.
 *
 * @returns {object}
 */
 const registerVariation = (
	globalManifest = {},
	variationManifest = {},
	blocksManifest = [],
) => {
	// Append globalManifest data in to output.
	if (variationManifest['icon']) {
		variationManifest['icon'] = getIconOptions(globalManifest, variationManifest);
	} else {
		// There is no icon passed to variation, use it's parent icon instead
		if (blocksManifest) {
			blocksManifest.forEach(manifest => {
				if (manifest.name === variationManifest?.name) {
					variationManifest['icon'] = manifest['icon'];
				}
			});
		}
	}

	// This is a full block name used in Block Editor.
	const fullBlockName = getFullBlockNameVariation(globalManifest, variationManifest);

	return {
		blockName: fullBlockName,
		options: {
			...variationManifest,
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
const registerBlock = (
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
	blockManifest['example'].attributes = getExample('', blockManifest);

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
 * @param {object} globalManifest                 - Must provide global blocks setting manifest.json.
 * @param {function?} [wrapperComponent]          - Callback function that returns a `Wrapper`.
 * @param {object} wrapperManifest                - `Wrapper` manifest.
 * @param {function} componentsManifestPath       - **Must provide `require.context` for all components `manifest.json`s.**
 * @param {function} blocksManifestPath           - **Must provide `require.context` for all blocks manifest.json-s.**
 * @param {function} blocksEditComponentPath      - **Must provide `require.context` for all blocks JavaScript files (unable to add only block edit file due to dynamic naming).**
 * @param {function?} [hooksComponentPath]        - Function of hooks JavaScript files in a block from `require.context`.
 * @param {function?} [transformsComponentPath]   - Function of transforms JavaScript files in a block from `require.context`.
 * @param {function?} [deprecationsComponentPath] - Function of deprecations JavaScript files in a block from `require.context`.
 * @param {function?} [overridesComponentPath]    - Function of overrides JavaScript files in a block from `require.context`.
 *
 * @returns {mixed}
 *
 * Usage:
 * ```js
 * registerBlocks(
 *   globalSettings,
 *   Wrapper,
 *   WrapperManifest,
 *   require.context('./../../components', true, /manifest.json$/),
 *   require.context('./../../custom', true, /manifest.json$/),
 *   require.context('./../../custom', true, /-block.js$/),
 *   require.context('./../../custom', true, /-hooks.js$/),
 *   require.context('./../../custom', true, /-transforms.js$/),
 *   require.context('./../../custom', true, /-deprecations.js$/),
 *   require.context('./../../custom', true, /-overrides.js$/),
 * );
 * ```
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
	deprecationsComponentPath = null,
	overridesComponentPath = null,
) => {

	const componentsManifest = componentsManifestPath.keys().map(componentsManifestPath);
	const blocksManifests = blocksManifestPath.keys().map(blocksManifestPath);

	// Set all manifests to global window for usage in storybook.
	if (typeof window?.['eightshift'] === 'undefined') {
		window['eightshift'] = {};
	}

	window['eightshift'][process.env.VERSION] = {
		settings: globalManifest,
		components: componentsManifest,
		blocks: blocksManifests,
		wrapper: wrapperManifest,
	};

	// Iterate blocks to register.
	blocksManifests.map((blockManifest) => {
		const {
			active = true,
		} = blockManifest;

		// If block has active key set to false the block will not show in the block editor.
		if (active) {
			// Get Block edit component from block name and blocksEditComponentPath.
			const blockComponent = getBlockEditComponent(blockManifest.blockName, blocksEditComponentPath, 'block');

			// Get Block Transforms component from block name and transformsComponentPath.
			if (transformsComponentPath !== null) {
				const blockTransformsComponent = getBlockGenericComponent(blockManifest.blockName, transformsComponentPath, 'transforms');

				if (blockTransformsComponent !== null) {
					blockManifest.transforms = blockTransformsComponent;
				}
			}

			// Get Block Deprecations component from block name and deprecationsComponentPath.
			if (deprecationsComponentPath !== null) {
				const blockDeprecationsComponent = getBlockGenericComponent(blockManifest.blockName, deprecationsComponentPath, 'deprecations');

				if (blockDeprecationsComponent !== null) {
					blockManifest.deprecated = blockDeprecationsComponent;
				}
			}

			// Get Block Hooks component from block name and hooksComponentPath.
			if (hooksComponentPath !== null) {
				const blockHooksComponent = getBlockGenericComponent(blockManifest.blockName, hooksComponentPath, 'hooks');

				if (blockHooksComponent !== null) {
					blockHooksComponent();
				}
			}

			// Get Block Overrides component from block name and overridesComponentPath.
			if (overridesComponentPath !== null) {
				const blockOverridesComponent = getBlockGenericComponent(blockManifest.blockName, overridesComponentPath, 'overrides');

				if (blockOverridesComponent !== null) {
					blockManifest = Object.assign(blockManifest, blockOverridesComponent); // eslint-disable-line no-param-reassign
				}
			}

			// Pass data to registerBlock helper to get final output for registerBlockType.
			const blockDetails = registerBlock(
				globalManifest,
				wrapperManifest,
				componentsManifest,
				blockManifest,
				wrapperComponent,
				blockComponent
			);

			// Format the 'deprecated' attribute details to match the format Gutenberg wants.
			if (blockDetails?.options?.deprecated) {
				blockDetails.options.deprecated = blockDetails.options.deprecated.map((deprecation) => {
					if (deprecation?.attributes && deprecation?.migrate) {
						return {
							...deprecation,
							isEligible: deprecation?.isEligible ?? (() => true),
							save: blockDetails.options.save,
						};
					}

					return {
						attributes: {
							...getAttributes(globalManifest, wrapperManifest, componentsManifest, blockManifest),
							...deprecation.oldAttributes,
						},
						migrate: (attributes) => {
							return {
								...getAttributes(globalManifest, wrapperManifest, componentsManifest, blockManifest),
								...attributes,
								...deprecation.newAttributes(attributes),
							};
						},
						isEligible: deprecation?.isEligible ?? ((attributes) => Object.keys(deprecation.oldAttributes).every((v) => Object.keys(attributes).includes(v))),
						save: blockDetails.options.save,
					};
				});
			}

			// Native WP method for block registration.
			registerBlockType(blockDetails.blockName, blockDetails.options);

		}

		return null;
	});

	// Add icon foreground and background colors as CSS variables for later use.
	const {
		background: backgroundGlobal,
		foreground: foregroundGlobal,
	} = globalManifest;

	document.documentElement.style.setProperty('--eightshift-block-icon-foreground', foregroundGlobal);
	document.documentElement.style.setProperty('--eightshift-block-icon-background', backgroundGlobal);
};

/**
 * Get component manifest got from window object.
 *
 * @returns {object}
 */
const getComponentsManifest = () => {
	return window?.['eightshift']?.[process.env.VERSION].components ?? {};
};

/**
 * Register all Variations Editor blocks using WP `registerBlockVariation` method.
 * Due to restrictions in dynamic import using dynamic names all block are register using `require.context`.
 *
 * @param {object} globalManifest              - **Must provide global blocks setting `manifest.json`.**
 * @param {function} variationsManifestPath    - **Must provide require.context for all variations `manifest.json`s.**
 * @param {function} [blocksManifestPath]      - **require.context for all blocks `manifest.json`s.**
 * @param {function?} [overridesComponentPath] - Function of overrides JavaScript files in a block from `require.context`.
 *
 * @returns {null}
 *
 * Usage:
 * ```js
 * registerVariations(
 *   globalSettings,
 *   require.context('./../../variations', true, /manifest.json$/),
 *   require.context('./../../custom', true, /manifest.json$/),
 *   require.context('./../../variations', true, /-overrides.js$/),
 * );
 * ```
 */
 export const registerVariations = (
	globalManifest = {},
	variationsManifestPath,
	blocksManifestPath = null,
	overridesComponentPath = null,
) => {

	const variationsManifests = variationsManifestPath.keys().map(variationsManifestPath);

	// Iterate blocks to register.
	variationsManifests.map((variationManifest) => {

		const {
			active = true,
		} = variationManifest;

		// If variation has active key set to false the variation will not show in the block editor.
		if (active) {
			// Get Block Overrides component from block name and overridesComponentPath.
			if (overridesComponentPath !== null) {
				const blockOverridesComponent = getBlockGenericComponent(variationManifest.name, overridesComponentPath, 'overrides');

				if (blockOverridesComponent !== null) {
					variationManifest = Object.assign(variationManifest, blockOverridesComponent); // eslint-disable-line no-param-reassign
				}
			}

			// Pass data to registerVariation helper to get final output for registerBlockVariation.
			const blockDetails = registerVariation(
				globalManifest,
				variationManifest,
				(blocksManifestPath !== null) ? blocksManifestPath.keys().map(blocksManifestPath) : []
			);

			// Native WP method for block registration.
			registerBlockVariation(blockDetails.blockName, blockDetails.options);
		}

		return null;
	});
};
