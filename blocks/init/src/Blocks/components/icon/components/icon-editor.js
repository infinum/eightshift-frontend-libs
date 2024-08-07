import React, { useMemo } from 'react';
import { selector, checkAttr, getUnique, outputCssVariables } from '@eightshift/frontend-libs/scripts';
import { clsx } from '@eightshift/ui-components/utilities';
import manifest from './../manifest.json';
import globalManifest from './../../../manifest.json';

export const IconEditor = (attributes) => {
	const unique = useMemo(() => getUnique(), []);

	const {
		componentClass,
		icons: manifestIcons,
	} = manifest;

	const {
		selectorClass = componentClass,
		blockClass,
		additionalClass,
	} = attributes;

	const iconUse = checkAttr('iconUse', attributes, manifest);
	const iconName = checkAttr('iconName', attributes, manifest);

	const iconClass = clsx(
		selector(componentClass, componentClass),
		selector(blockClass, blockClass, selectorClass),
		selector(additionalClass, additionalClass),
	);

	if (!iconUse) {
		return null;
	}

	return (
		<>
			{outputCssVariables(attributes, manifest, unique, globalManifest)}
			<i className={iconClass} dangerouslySetInnerHTML={{ __html: manifestIcons[iconName] }} data-id={unique} />
		</>
	);
};
