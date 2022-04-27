/**
 * @jest-environment jsdom
 */
import { getAttributes } from '../../../scripts/editor/registration';
import wrapperManifest from '../../../blocks/init/src/Blocks/wrapper/manifest.json';
import globalManifest from '../../../blocks/init/src/Blocks/manifest.json';
import { blockAttributes } from '../../data/block-attributes';
import { expect } from '@jest/globals';
import {
	getAllComponentManifests,
	getAllBlockManifests,
	getComponentDependencies,
	recursiveBuildProps,
	getBlockDependencies,
	getComponentManifest,
	getSettingsBlock,
	getMockComponentManifest,
	getMockBlockManifest,
} from '../../helpers/blocks';
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
	try {
		expect(builtProps).toHaveProperty('attributes');
	} catch(e) {
		throw Error(`Missing attributes key in built props for: ${debugName(builtProps)}`);
	}

	try {
		expect(typeof builtProps.attributes).toBe('object');
	} catch(e) {
		throw Error(`Attributes key found but is not an array in built props for: ${debugName(builtProps)}`);
	}

	// Check expected
	if (!isBlock || expectedProps.expected) {
		for (const expected of expectedProps.expected) {
			try {
				expect(builtProps.attributes).toHaveProperty(expected);
			} catch(e) {
				throw Error(`Missing expected property in built props for: ${debugName(builtProps)}`);
			}
		}
	}

	// Check not expected
	if (!isBlock || expectedProps.notExpected) {
		for (const notExpected of expectedProps.notExpected) {
			try {
				expect(builtProps.attributes).not.toHaveProperty(notExpected);
			} catch(e) {
				throw Error(`Found not-expected property in built props for: ${debugName(builtProps)}`);
			}
		}
	}

	// Check prefix (but only if expected)
	if (!isBlock || expectedProps.prefix) {
		try {
			expect(builtProps.attributes).toHaveProperty('prefix');
		} catch(e) {
			throw Error(`Missing "prefix" key in built props for ${debugName(builtProps)}`);
		}

		try {
			expect(builtProps.attributes.prefix).toEqual(expectedProps.prefix);
		} catch(e) {
			throw Error(`Prefix key not correct when sending props to ${debugName(builtProps)}`);
		}
	}

	// Repeat if expected has subComponents
	if (expectedProps.components && Object.keys(expectedProps.components).length > 0) {
		for (const componentKey of Object.keys(expectedProps.components)) {

			// Expect built props has subComponents
			try {
				expect(builtProps).toHaveProperty('subComponents');
			} catch(e) {
				throw Error(`Missing "subComponents" key in built props for ${debugName(builtProps)}. Expecting one because this has subComponents defined in props-output.js`);
			}

			try {
				expect(builtProps.subComponents).not.toEqual([]);
			} catch(e) {
				throw Error(`"subComponents" key in built props empty for ${debugName(builtProps)}.`);
			}

			// Find the correct subComponent
			const subComponent = builtProps.subComponents.filter((subComponent) => {
				const relevantName = subComponent.newName ? subComponent.newName : subComponent.realName;
				return relevantName === componentKey
			});

			// Expect to find exactly 1 sub component
			try {
				expect(subComponent).toHaveLength(1);
			} catch(e) {
				throw Error(`Expected subComponent not found in built props for ${debugName(builtProps)}.`);
			}

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
			try {
				expect(attributeNames).toEqual(expect.arrayContaining(blockAttributes[blockName].expected));
			} catch(e) {
				throw Error(`Block ${blockName} does not contain all expected attributes`);
			}
		}

		// Make sure the block does not contain nonExpected attributes.
		if (blockAttributes[blockName].notExpected) {
			for (const notExpected of blockAttributes[blockName].notExpected) {
				try {
					expect(attributeNames).not.toEqual(expect.arrayContaining([notExpected]));
				} catch(e) {
					throw Error(`Block ${blockName} contains some non-expected attributes`);
				}
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
			blockOutput.subComponents = [...blockOutput.subComponents, ...recursiveBuildProps(attributes, componentManifests, realName, newName)];
		}

		props = [...props, blockOutput];

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
 * to override its child attributes.
 *
 * @group unit
 */
it('tests block / component attribute generation and overriding attributes in parent component / blocks', () => {
	const componentManifests = getAllComponentManifests();

	// Test bottom level, mock paragraph extending mock typography
	const lvl2Manifest = getMockComponentManifest('mock-paragraph');
	const lvl2Attributes = getAttributes(globalManifest, wrapperManifest, componentManifests, lvl2Manifest);

	expect(lvl2Attributes).toHaveProperty('mockParagraphMockTypographyContent');
	expect(lvl2Attributes.mockParagraphMockTypographyContent).toHaveProperty('default');
	expect(lvl2Attributes.mockParagraphMockTypographyContent.default).toBe('This is lvl 2 override');

	// Test level 3: component overriding attributes 1 level below it.
	const lvl3Manifest = getMockComponentManifest('mock-attribute-override');
	const lvl3Attributes = getAttributes(globalManifest, wrapperManifest, componentManifests, lvl3Manifest);

	expect(lvl3Attributes).toHaveProperty('mockAttributeOverrideMockParagraphMockTypographyContent');
	expect(lvl3Attributes.mockAttributeOverrideMockParagraphMockTypographyContent).toHaveProperty('default');
	expect(lvl3Attributes.mockAttributeOverrideMockParagraphMockTypographyContent.default).toBe('This is lvl 3 override');

	// Test level 4: component overriding attributes 1 level below it where attribute has already been overridden.
	const lvl4Manifest = getMockBlockManifest('mock-attribute-override');
	const lvl4Attributes = getAttributes(globalManifest, wrapperManifest, componentManifests, lvl4Manifest);
	expect(lvl4Attributes).toHaveProperty('mockAttributeOverrideMockParagraphMockTypographyContent');
	expect(lvl4Attributes.mockAttributeOverrideMockParagraphMockTypographyContent).toHaveProperty('default');
	expect(lvl4Attributes.mockAttributeOverrideMockParagraphMockTypographyContent.default).toBe('This is lvl 4 override');
});

it('tests block / component attribute overriding when overriding happens on top and bottom lvl, but not in the middle component', () => {
	const componentManifests = getAllComponentManifests();

	// Test bottom level, mock paragraph extending mock typography
	const lvl2Manifest = getMockComponentManifest('mock-paragraph');
	const lvl2Attributes = getAttributes(globalManifest, wrapperManifest, componentManifests, lvl2Manifest);

	expect(lvl2Attributes).toHaveProperty('mockParagraphMockTypographyContent');
	expect(lvl2Attributes.mockParagraphMockTypographyContent).toHaveProperty('default');
	expect(lvl2Attributes.mockParagraphMockTypographyContent.default).toBe('This is lvl 2 override');

	// Test level 4: component overriding attributes 1 level below it where attribute has already been overridden.
	const lvl4Manifest = getMockBlockManifest('mock-attribute-override-skip');
	const lvl4Attributes = getAttributes(globalManifest, wrapperManifest, componentManifests, lvl4Manifest);
	expect(lvl4Attributes).toHaveProperty('mockAttributeOverrideSkipMockNoOverrideMockParagraphMockTypographyContent');
	expect(lvl4Attributes.mockAttributeOverrideSkipMockNoOverrideMockParagraphMockTypographyContent).toHaveProperty('default');
	expect(lvl4Attributes.mockAttributeOverrideSkipMockNoOverrideMockParagraphMockTypographyContent.default).toBe('This is lvl 4 override');
});
