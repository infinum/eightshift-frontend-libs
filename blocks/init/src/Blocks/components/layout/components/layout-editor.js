import React, { useMemo } from 'react';
import classnames from 'classnames';
import { getUnique, outputCssVariables, selector, checkAttr } from '@eightshift/frontend-libs/scripts';
import manifest from '../manifest.json';

export const LayoutEditor = (attributes) => {
	const layoutUse = checkAttr('layoutUse', attributes, manifest);

	if (!layoutUse) {
		return null;
	}

	const unique = useMemo(() => getUnique(), []);

	const {
		componentClass,
	} = manifest;

	const {
		selectorClass = componentClass,
		blockClass,
		additionalClass,
	} = attributes;

	const layoutType = checkAttr('layoutType', attributes, manifest);
	const layoutItems = checkAttr('layoutItems', attributes, manifest);

	const layoutClass = classnames([
		selector(componentClass, componentClass),
		selector(blockClass, blockClass, selectorClass),
		selector(additionalClass, additionalClass),
	]);

	return (
		<div className={layoutClass} data-id={unique} data-layout-type={layoutType}>
			{outputCssVariables(attributes, manifest, unique)}

			<div className={`${componentClass}__wrap`}>
				{layoutItems}
			</div>
		</div>
	);
};
