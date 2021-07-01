/**
 * @jest-environment jsdom
 */

import { buildWindowObject, getAttributes } from '../../../scripts/editor/register-blocks';
import wrapperManifest from '../../../blocks/init/src/Blocks/wrapper/manifest.json';
import globalManifest from '../../../blocks/init/src/Blocks/manifest.json';
import { blockAttributes } from '../../data/block-attributes';
import { expect } from '@jest/globals';
import { getAllComponentManifests, getAllBlockManifests, getComponentDependencies, recursiveBuildProps } from '../../helpers/blocks';

/**
 * Unit tests for get-option-colors.js helper
 *
 * @group unit
 */
it('tests block registration properly inherits all component attributes', () => {

	const componentManifests = getAllComponentManifests();
	const blockManifests = getAllBlockManifests();

	// Build an array of expected attributes in each block.
	buildWindowObject(globalManifest, componentManifests, blockManifests, wrapperManifest);

	// Test all block manifests.
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
			for (const notExpected of blockAttributes[blockName].notExpected) {
				expect(attributeNames).not.toEqual(expect.arrayContaining([notExpected]));
			}
		}
	}
});

it('tests that props helper builds the prefix correctly', () => {
	const componentManifests = getAllComponentManifests();
	const blockManifests = getAllBlockManifests();

	// Build an array of expected attributes in each block.
	buildWindowObject(globalManifest, componentManifests, blockManifests, wrapperManifest);

	// Test all block manifests.
	// for (const blockManifest of blockManifests) {
	// 	const blockName = blockManifest.blockName;
	// 	const attributes = getAttributes(globalManifest, wrapperManifest, componentManifests, blockManifest);

	// 	new componentAttributes = {...props(attributes, camelize(blockName), '', true)};
	// }

	// TEMP
	let testManifest = {};
	for (const blockManifest of blockManifests) {
		const blockName = blockManifest.blockName;

		if (blockName === 'mock-blockquote') {
			testManifest = blockManifest;
			break;
		}
	}

	const attributes = getAttributes(globalManifest, wrapperManifest, componentManifests, testManifest);

	// Build props for the current component.
	// const props = recursiveBuildProps(attributes, componentManifests, testManifest.blockName);
	let props = [];
	const components = getComponentDependencies(componentManifests, testManifest.blockName);
	for (const newName of Object.keys(components)) {
		const realName = components[newName];
		props = [...props, ...recursiveBuildProps(attributes, componentManifests, realName, newName, true)]
	}

	console.log(props);
});
