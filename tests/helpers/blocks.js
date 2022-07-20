import Path from 'path';
import { readdirSync, readFileSync } from "fs";
import { props } from '../../scripts/editor/attributes';

const pathToBlocksFolder = Path.resolve(__dirname, '..', '..', 'blocks', 'init', 'src', 'Blocks');
const pathToComponents = Path.resolve(pathToBlocksFolder, 'components');
const pathToBlocks = Path.resolve(pathToBlocksFolder, 'custom');

const pathToMockBlocksFolder = Path.resolve(__dirname, '..', 'data', 'src', 'Blocks');
const pathToMockComponents = Path.resolve(pathToMockBlocksFolder, 'components');
const pathToMockBlocks = Path.resolve(pathToMockBlocksFolder, 'custom');

/**
 * Returns all manifests from directories inside `dir`.
 *
 * @param {string} dir Full path to dir in which we're looking for other 
 *                     dirs (components / blocks) which have manifest.json inside.
 *                     Example: 'blocks/init/src/Blocks/components'
 * @returns {array<object>} Array of manifest.json contents
 */
const getAllManifestsFromDir = (dir) => {
	const manifestDirs = readdirSync(dir).filter((item) => !item.startsWith('.'));

	return manifestDirs.map((manifestDir) => {
		const manifestPath = Path.resolve(dir, manifestDir, 'manifest.json');
		return JSON.parse(readFileSync(manifestPath));
	});
}

/**
 * Get all components, both the mock ones specifically for tests and the actual libs blocks.
 * 
 * @return {array}
 */
export const getAllComponentManifests = () => [
	...getAllManifestsFromDir(pathToComponents),
	...getAllManifestsFromDir(pathToMockComponents)
];

/**
 * Get all components, both the mock ones specifically for tests and the actual libs blocks.
 *
 * @return {array}
 */
export const getAllBlockManifests = () => [
	...getAllManifestsFromDir(pathToBlocks),
	...getAllManifestsFromDir(pathToMockBlocks)
];

const getManifest = (path, name) => {
	const manifestPath = Path.resolve(path, name, 'manifest.json');
	return JSON.parse(readFileSync(manifestPath));
}

export const getComponentManifest = (componentName) => getManifest(pathToComponents, componentName);
export const getSettingsBlock = (blockName) => getManifest(pathToBlocks, blockName);
export const getMockComponentManifest = (componentName) => getManifest(pathToMockComponents, componentName);
export const getMockBlockManifest = (blockName) => getManifest(pathToMockBlocks, blockName);

/**
 * Returns an object composed of all component dependencies (if they exist) if the following format:
 * {
 * 	 newName: realName,
 *   ...
 * }
 *
 * @param {array<object>} componentManifests Array of all component manifests
 * @param {string} componentName Component name for which we want to get dependency components
 *
 * @return {object}
 */
export const getComponentDependencies = (componentManifests, componentName) => {
	let components = {};

	for (const componentManifest of componentManifests) {
		if (componentManifest.componentName === componentName && componentManifest.components) {
			components = componentManifest.components;
			break;
		}
	}

	return components;
}

/**
 * Returns an object composed of all component dependencies (if they exist) if the following format:
 * {
 * 	 newName: realName
 *   ...
 * }
 *
 * @param {array<object>} blockManifests Array of all block manifests
 * @param {string} blockName Block name for which we want to get dependency components
 *
 * @return {object}
 */
export const getBlockDependencies = (blockManifests, blockName) => {
	let components = {};

	for (const blockManifest of blockManifests) {
		if (blockManifest.blockName === blockName && blockManifest.components) {
			components = blockManifest.components;
			break;
		}
	}

	return components;
}

/**
 * Recursively builds props for a block and all it's sub dependencies.
 * 
 * @return {array}
 */
export const recursiveBuildProps = (attributes, componentManifests, realName, newName) => {

	// Output props for all components.
	let propsArray = [];
	const newComponentAttributes = props(newName, attributes);

	const componentOutput = {
		realName,
		newName,
		attributes: newComponentAttributes,
		subComponents: [],
	};

	// Check if this component has any sub-components and recursively call this function.
	const components = getComponentDependencies(componentManifests, newName);
	for (const subNewName of Object.keys(components)) {
		const subRealName = components[subNewName];
		componentOutput.subComponents = [
			...componentOutput.subComponents,
			...recursiveBuildProps(newComponentAttributes, componentManifests, subRealName, subNewName)
		];
	}

	return [...propsArray, componentOutput];
}
