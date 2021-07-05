/**
 * @jest-environment jsdom
 */
import 'jest-expect-message'
import { getAttributes } from '../../../scripts/editor/register-blocks';
import wrapperManifest from '../../../blocks/init/src/Blocks/wrapper/manifest.json';
import globalManifest from '../../../blocks/init/src/Blocks/manifest.json';
import { blockAttributes } from '../../data/block-attributes';
import { expect } from '@jest/globals';
import { getAllComponentManifests, getAllBlockManifests, getComponentDependencies, recursiveBuildProps, getBlockDependencies, getComponentManifest, getBlockManifest, getMockComponentManifest, getMockBlockManifest } from '../../helpers/blocks';
import { propsOutput } from '../../data/props-output';

/**
 * Returns the name of the component from builtProps.
 *
 * @param {object} builtProps Built props for a component
 *
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
const recursiveAssertProps = (expectedProps, builtProps, isBlock = false) => {

	// Some sanity check
	expect(
		builtProps,
		`Missing attributes key in built props for: ${debugName(builtProps)}`
	).toHaveProperty('attributes');

	expect(
		typeof builtProps.attributes,
		`Attributes key found but is not an array in built props for: ${debugName(builtProps)}`
	).toBe('object');

	// Check expected
	if (!isBlock || expectedProps.expected) {
		for (const expected of expectedProps.expected) {
			expect(
				builtProps.attributes,
				`Missing expected property in built props for: ${debugName(builtProps)}`
			).toHaveProperty(expected);
		}
	}

	// Check not expected
	if (!isBlock || expectedProps.notExpected) {
		for (const notExpected of expectedProps.notExpected) {
			expect(
				builtProps.attributes,
				`Found not-expected property in built props for: ${debugName(builtProps)}`
			).not.toHaveProperty(notExpected);
		}
	}

	// Check prefix (but only if expected)
	if (!isBlock || expectedProps.prefix) {
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
			const subComponent = builtProps.subComponents.filter((subComponent) => {
				const relevantName = subComponent.newName ? subComponent.newName : subComponent.realName;
				return relevantName === componentKey
			});

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
 * Unit tests for block registration. All of the tests below are built so they run through the entire block / component tree
 * defined in blocks/init/src/Blocks (blocks / components available in boilerplate)
 * as well as tests/data/src/Blocks (blocks / components used for testing)
 *
 * @group unit
 */
it('tests block registration properly inherits all component attributes', () => {

	const componentManifests = getAllComponentManifests();
	const blockManifests = getAllBlockManifests();

	// Test all block manifests.
	for (const blockManifest of blockManifests) {
		const blockName = blockManifest.blockName;
		const attributeNames = Object.keys(getAttributes(globalManifest, wrapperManifest, componentManifests, blockManifest));

		// Only test blocks which expected / not expected attributes defined.
		if (!blockAttributes[blockName]) {
			continue;
		}

		// Make sure the block contains all expected attributes.
		if (blockAttributes[blockName].expected) {
			expect(
				attributeNames,
				`Block ${blockName} does not contain all expected attributes`
			).toEqual(expect.arrayContaining(blockAttributes[blockName].expected));
		}

		// Make sure the block does not contain nonExpected attributes.
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

/**
 * Unit tests for prop passing. All of the tests below are built so they run through the entire block / component tree
 * defined in blocks/init/src/Blocks (blocks / components available in boilerplate)
 * as well as tests/data/src/Blocks (blocks / components used for testing)
 *
 * @group unit
 */
it('tests that props helper builds the attributes / prefix correctly for all blocks', () => {
	const componentManifests = getAllComponentManifests();
	const blockManifests = getAllBlockManifests();

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
			const realName = components[newName];
			blockOutput.subComponents = [...blockOutput.subComponents, ...recursiveBuildProps(attributes, componentManifests, realName, newName, true)];
		}

		props = [...props, blockOutput];

		// Props seem to be correctly built
		// for(const prop of props) {

		// 	if (prop.realName !== 'card') {
		// 		continue;
		// 	}

		// 	console.log(prop.subComponents);
		// 	console.log(prop.subComponents[0].subComponents);
		// }

		for (let blockProps of props) {

			// Only run on on blocks we manually defined props output for.
			if (!propsOutput[blockProps.realName]) {
				continue
			}

			const blockExpectedProps = propsOutput[blockProps.realName];

			recursiveAssertProps(blockExpectedProps, blockProps, true);
		}
	}
});

/**
 * Unit tests for attribute overriding in parent blocks. Each block / component should be able
 * to override it's child attributes.
 *
 * @group unit
 */
it('tests block registration and overriding attributes in parent component / blocks', () => {
	const componentManifests = getAllComponentManifests();

	// Test bottom lvl, mock paragraph extending mock typography
	const lvl2Manifest = getMockComponentManifest('mock-paragraph');
	const lvl2Attributes = getAttributes(globalManifest, wrapperManifest, componentManifests, lvl2Manifest);

	expect(lvl2Attributes).toHaveProperty('mockTypographyContent');
	expect(lvl2Attributes.mockTypographyContent).toHaveProperty('default');
	expect(lvl2Attributes.mockTypographyContent.default).toBe('This is lvl 2 override');

	// Test lvl 3, component overriding attributes 1 lvl below it.
	const lvl3Manifest = getMockComponentManifest('mock-attribute-override');
	const lvl3Attributes = getAttributes(globalManifest, wrapperManifest, componentManifests, lvl3Manifest);

	expect(lvl3Attributes).toHaveProperty('mockParagraphMockTypographyContent');
	expect(lvl3Attributes.mockParagraphMockTypographyContent).toHaveProperty('default');
	expect(lvl3Attributes.mockParagraphMockTypographyContent.default).toBe('This is lvl 3 override');

	// Test lvl 4, component overriding attributes 1 lvl below it where attribute has already been overriden.
	const lvl4Manifest = getMockBlockManifest('mock-attribute-override');
	const lvl4Attributes = getAttributes(globalManifest, wrapperManifest, componentManifests, lvl4Manifest);
	expect(lvl4Attributes).toHaveProperty('mockAttributeOverrideMockParagraphMockTypographyContent');
	expect(lvl4Attributes.mockAttributeOverrideMockParagraphMockTypographyContent).toHaveProperty('default');
	expect(lvl4Attributes.mockAttributeOverrideMockParagraphMockTypographyContent.default).toBe('This is lvl 4 override');
});
