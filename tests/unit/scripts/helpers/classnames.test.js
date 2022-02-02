import { classnames } from "../../../../scripts/helpers/classnames";
import { selector } from "../../../../scripts/helpers/selector";
import { getComponentManifest } from "../../../helpers/blocks";

it('tests classnames returns class string from manifest values', () => {
	const accordionManifest = getComponentManifest('accordion');

	const accordionClassnames = classnames([
		selector(accordionManifest.componentClass, accordionManifest.componentClass),
		selector(accordionManifest.componentJsClass, accordionManifest.componentJsClass),
	]);

	expect(accordionClassnames).toBe(`${accordionManifest.componentClass} ${accordionManifest.componentJsClass}`);
});

it('tests classnames returns empty class string when selector function returns empty string', () => {
	const accordionManifest = getComponentManifest('accordion');

	const accordionClassnames = classnames([
		'',
		' ',
		selector(!accordionManifest.componentClass, accordionManifest.componentClass),
		selector(!accordionManifest.componentJsClass, accordionManifest.componentJsClass),
	]);

	expect(accordionClassnames).toBe('');
});

it('tests classnames returns only valid classes', () => {
	const accordionManifest = getComponentManifest('accordion');

	const accordionClassnames = classnames([
		selector(accordionManifest.componentClass, accordionManifest.componentClass),
		selector(accordionManifest.componentMissingClass, accordionManifest.componentMissingClass),
		'',
		' ',
		selector(accordionManifest.attributes.accordionUse.default, accordionManifest.componentClass, 'element', 'modifier'),
		selector(true === false, accordionManifest.componentClass, 'element', 'modifier-2'),
		accordionManifest.attributes.accordionIsOpen.default === true ? 'is-open' : 'is-closed',
	]);

	expect(accordionClassnames).toBe(`${accordionManifest.componentClass} ${accordionManifest.componentClass}__element--modifier is-closed`);
});

it('tests classnames throws error on wrong argument type', () => {
	expect(() => {classnames('test-class');}).toThrow();
});
