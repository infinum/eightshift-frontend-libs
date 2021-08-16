import { checkAttr } from "../../../../scripts/helpers/check-attr";
import { getComponentManifest, getMockComponentManifest } from "../../../helpers/blocks";

it('tests checkAttr returns attributes with prefix', () => {
	const accordionManifest = getComponentManifest('accordion');
	const mockAttributes = {
		componentName: 'accordion',
		prefix: 'mockAccordionOverride',
		mockAccordionOverrideContent: 'Some value'
	};

	const accordionContent = checkAttr('accordionContent', mockAttributes, accordionManifest);
	expect(accordionContent).toBe('Some value');
});

it('tests checkAttr returns exact attribute value when there is no prefix', () => {
	const accordionManifest = getComponentManifest('accordion');
	const mockAttributes = {
		componentName: 'accordion',
		accordionContent: 'Some value'
	};

	const accordionContent = checkAttr('accordionContent', mockAttributes, accordionManifest);
	expect(accordionContent).toBe('Some value');
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
	const accordionManifest = getComponentManifest('accordion');
	const mockAttributes = {
		componentName: 'accordion',
	};

	const accordionContent = checkAttr('accordionContent', mockAttributes, accordionManifest);
	expect(accordionContent).toBe('');
});