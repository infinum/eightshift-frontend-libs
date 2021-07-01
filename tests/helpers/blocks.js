import Path from 'path';
import { readdirSync, readFileSync } from "fs";
import { props } from '../../scripts/editor';

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
 * 										 dirs (components / blocks) which have manifest.json inside.
 * 										 Example: 'blocks/init/src/Blocks/components'
 * @returns {array<object>} Array of manifest.json contents
 */
const getAllManifestsFromDir = (dir) => {
	const manifestDirs = readdirSync(dir);
	return manifestDirs.map((manifestDir) => {
		const manifestPath = Path.resolve(dir, manifestDir, 'manifest.json');
		const manifest = JSON.parse(readFileSync(manifestPath));
		return manifest;
	});
}

/**
 * Get all components, both the mock ones specifically for tests and the actual libs blocks.
 * 
 * @return {array}
 */
export const getAllComponentManifests = () => {
	const componentManifests = getAllManifestsFromDir(pathToComponents);
	const mockComponentManifests = getAllManifestsFromDir(pathToMockComponents);
	return [...componentManifests, ...mockComponentManifests];
}

/**
 * Get all components, both the mock ones specifically for tests and the actual libs blocks.
 *
 * @return {array}
 */
export const getAllBlockManifests = () => {
	const blockManifests = getAllManifestsFromDir(pathToBlocks);
	const mockBlockManifests = getAllManifestsFromDir(pathToMockBlocks);
	return [...blockManifests, ...mockBlockManifests];
}

/**
 * Returns an object composed of all component dependencies (if they exist) if the following format:
 * {
 * 	 newName: realName
 * }
 *
 * @param {array<object>} componentManifests Array of all component manifests
 * @param {string} componentName Component name for which we want to get dependency components
 * @return {object}
 */
export const getComponentDependencies = (componentManifests, componentName) => {
	let components = {};

	for(const componentManifest of componentManifests) {
		if (componentManifest.componentName === componentName && componentManifest.components) {
			components = componentManifest.components;
			break;
		}
	}

	return components;
}

/**
 * Recursively builds props for a block and all it's sub dependencies.
 */
export const recursiveBuildProps = (attributes, componentManifests, realName, newName, isBlock = false) => {

	// Output props for all components.
	let propsArray = [];
	const isNameDifferent = realName !== newName;
	const newComponentAttributes = props(attributes, realName, isNameDifferent ? newName : '', isBlock);
	const componentOutput = {
		realName,
		newName,
		attributes: newComponentAttributes,
		subComponents: [],
	};
	
	// Check if this component has any sub-components and recursively call this function.
	const components = getComponentDependencies(componentManifests, realName, newName);
	for (const subNewName of Object.keys(components)) {
		const subRealName = components[subNewName];
		componentOutput.subComponents = [...componentOutput.subComponents, ...recursiveBuildProps(newComponentAttributes, componentManifests, subRealName, subNewName)]
	}
	
	propsArray = [...propsArray, componentOutput];
	return propsArray;
}