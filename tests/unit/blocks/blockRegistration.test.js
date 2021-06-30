/**
 * @jest-environment jsdom
 */

import Path from 'path';
import { readdirSync, readFileSync } from "fs";
import { buildWindowObject, getAttributes } from '../../../scripts/editor/register-blocks';
import wrapperManifest from '../../../blocks/init/src/Blocks/wrapper/manifest.json';
import globalManifest from '../../../blocks/init/src/Blocks/manifest.json';
import { blockAttributes } from '../../data/block-attributes';
import { expect } from '@jest/globals';

const pathToBlocksFolder = Path.resolve(__dirname, '..', '..', '..', 'blocks', 'init', 'src', 'Blocks');
const pathToComponents = Path.resolve(pathToBlocksFolder, 'components');
const pathToBlocks = Path.resolve(pathToBlocksFolder, 'custom');

/**
 * Unit tests for get-option-colors.js helper
 *
 * @group unit
 */
it('tests block registration properly inherits all component attributes', () => {

	const blockDirs = readdirSync(pathToBlocks);
	const blockManifests = blockDirs.map((blockDir) => {
		const manifestPath = Path.resolve(pathToBlocks, blockDir, 'manifest.json');
		const manifest = JSON.parse(readFileSync(manifestPath));
		return manifest;
	});

	const componentDirs = readdirSync(pathToComponents);
	const componentManifests = componentDirs.map((componentDir) => {
		const manifestPath = Path.resolve(pathToComponents, componentDir, 'manifest.json');
		const manifest = JSON.parse(readFileSync(manifestPath));
		return manifest;
	});


	// Build an array of expected attributes in each block.
	buildWindowObject(globalManifest, componentManifests, blockManifests, wrapperManifest);

	let blocks = [];
	for (const blockManifest of blockManifests) {
		const blockName = blockManifest.blockName;
		const attributeNames = Object.keys(getAttributes(globalManifest, wrapperManifest, componentManifests, blockManifest));

		// Only test blocks which expected / not expected attributes defined.
		if (!blockAttributes[blockName]) {
			continue;
		}

		// Make sure the block contains all expected attributes
		if (blockAttributes[blockName].expected) {
			expect(attributeNames).toEqual(expect.arrayContaining(blockAttributes[blockName].expected));
		}

		// Make sure the block does not contain nonExpected attributes
		if (blockAttributes[blockName].notExpected) {
			for(const notExpected of blockAttributes[blockName].notExpected) {
				expect(attributeNames).not.toEqual(expect.arrayContaining([notExpected]));
			}
		}
	}
});
