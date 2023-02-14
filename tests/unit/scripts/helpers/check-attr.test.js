import { checkAttr } from "../../../../scripts/editor/attributes";
import { getComponentManifest, getMockComponentManifest } from "../../../helpers/blocks";

it('tests checkAttr returns attributes with prefix', () => {
	const buttonManifest = getComponentManifest('button');
	const mockAttributes = {
		componentName: 'button',
		prefix: 'mockButtonOverride',
		mockButtonOverrideContent: 'Some value'
	};

	const buttonContent = checkAttr('buttonContent', mockAttributes, buttonManifest);
	expect(buttonContent).toBe('Some value');
});

it('tests checkAttr returns exact attribute value when there is no prefix', () => {
	const buttonManifest = getComponentManifest('button');
	const mockAttributes = {
		componentName: 'button',
		buttonContent: 'Some value'
	};

	const buttonContent = checkAttr('buttonContent', mockAttributes, buttonManifest);
	expect(buttonContent).toBe('Some value');
});

it('tests checkAttr returns manifest default when there is nothing provided', () => {
	const mockTypographyManifest = getMockComponentManifest('mock-typography');
	const mockAttributes = {
		componentName: 'mock-typography',
	};

	const mockTypographySize = checkAttr('mockTypographySize', mockAttributes, mockTypographyManifest);
	expect(mockTypographySize).toBe('16-regular');
});

it('tests checkAttr returns default empty value for a specific type when there is no manifest default', () => {
	const buttonManifest = getComponentManifest('button');
	const mockAttributes = {
		componentName: 'button',
	};

	const buttonContent = checkAttr('buttonContent', mockAttributes, buttonManifest);
	expect(buttonContent).toBe('');
});
