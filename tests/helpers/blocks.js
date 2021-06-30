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
