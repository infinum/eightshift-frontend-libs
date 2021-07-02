/**
 * @jest-environment jsdom
 */
import 'jest-expect-message'
import { buildWindowObject, getAttributes } from '../../../scripts/editor/register-blocks';
import wrapperManifest from '../../../blocks/init/src/Blocks/wrapper/manifest.json';
import globalManifest from '../../../blocks/init/src/Blocks/manifest.json';
import { blockAttributes } from '../../data/block-attributes';
import { expect } from '@jest/globals';
import { getAllComponentManifests, getAllBlockManifests, getComponentDependencies, recursiveBuildProps, getBlockDependencies } from '../../helpers/blocks';
import { propsOutput } from '../../data/props-output';

/**
 * Returns the name of the component from builtProps.
 *
 * @param {object} builtProps Built props for a component
 * @returns {string}
 */
const debugName = (builtProps) => {
	return `"${builtProps.realName}" (newName: "${builtProps.newName || builtProps.realName}") component`;
}

/**
 * Asserts that built props match the expected output.
 *
 * @param {object} expectedProps propsOutput object for specific component
 * @param {object} builtProps Props built for this object.
 */
const recursiveAssertProps = (expectedProps, builtProps) => {

	// Some sanity check
	expect(
		builtProps,
		`Missing attributes key in built props for: ${debugName(builtProps)}`
	).toHaveProperty('attributes');

	// Check expected
	for (const expected of expectedProps.expected) {
		expect(
			builtProps.attributes,
			`Missing expected property in built props for: ${debugName(builtProps)}`
		).toHaveProperty(expected);
	}

	// Check not expected
	for (const notExpected of expectedProps.notExpected) {
		expect(builtProps.attributes).not.toHaveProperty(notExpected);
	}

	// Check prefix (but only if expected)
	if (expectedProps.prefix) {
		expect(
			builtProps.attributes,
			`Missing "prefix" key in built props for ${debugName(builtProps)}`
		).toHaveProperty('prefix');

		expect(
			builtProps.attributes.prefix,
			`Prefix key not correct when sending props to ${debugName(builtProps)}`
		).toEqual(expectedProps.prefix);
	}

	// Repeat if expected has subComponents
	if (expectedProps.components && Object.keys(expectedProps.components).length > 0) {
		for (const componentKey of Object.keys(expectedProps.components)) {

			// Expect built props has subComponents
			expect(
				builtProps,
				`Missing "subComponents" key in built props for ${debugName(builtProps)}. Expecting one because this has subComponents defined in props-output.js`
			).toHaveProperty('subComponents');

			expect(
				builtProps.subComponents,
				`"subComponents" key in built props empty for ${debugName(builtProps)}.`
			).not.toEqual([]);

			// Find the correct subComponent
			const subComponent = builtProps.subComponents.filter((subComponent) => subComponent.newName === componentKey);
			console.log('Looking for', componentKey);
			console.log(builtProps);

			// Expect to find exactly 1 sub component
			expect(
				subComponent,
				`Expected subComponent not found in built props for ${debugName(builtProps)}.`
			).toHaveLength(1);

			// Repeat for all subComponents
			recursiveAssertProps(expectedProps.components[componentKey], subComponent[0]);
		}
	}
}

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
			expect(
				attributeNames,
				`Block ${blockName} does not contain all expected attributes`
			).toEqual(expect.arrayContaining(blockAttributes[blockName].expected));
		}

		// Make sure the block does not contain nonExpected attributes
		if (blockAttributes[blockName].notExpected) {
			for (const notExpected of blockAttributes[blockName].notExpected) {
				expect(
					attributeNames,
					`Block ${blockName} contains some non-expected attributes`
				).not.toEqual(expect.arrayContaining([notExpected]));
			}
		}
	}
});

it('tests that props helper builds the attributes / prefix correctly for all blocks', () => {
	const componentManifests = getAllComponentManifests();
	const blockManifests = getAllBlockManifests();

	// Build an array of expected attributes in each block.
	buildWindowObject(globalManifest, componentManifests, blockManifests, wrapperManifest);

	// Test all block manifests.
	for (const blockManifest of blockManifests) {
		const attributes = getAttributes(globalManifest, wrapperManifest, componentManifests, blockManifest);

		// Build props for the current component.
		let props = [];
		const blockOutput = {
			attributes,
			realName: blockManifest.blockName,
			newName: '',
			subComponents: []
		};

		const components = getBlockDependencies(blockManifests, blockManifest.blockName);
		for (const newName of Object.keys(components)) {
			console.log('running for ', newName);
			const realName = components[newName];
			blockOutput.subComponents = [...blockOutput.subComponents, ...recursiveBuildProps(attributes, componentManifests, realName, newName, true)];
		}

		props = [...props, blockOutput];

		for (let blockProps of props) {

			// Only run on on blocks we manually defined props output for.
			if (!propsOutput[blockProps.realName]) {
				continue
			}

			const blockExpectedProps = propsOutput[blockProps.realName];

			for (let subComponentKey of Object.keys(blockExpectedProps.components || [])) {
				recursiveAssertProps(blockExpectedProps.components[subComponentKey], blockProps);
			}
		}
	}
});
