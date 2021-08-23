import React, { useMemo } from 'react';
import classnames from 'classnames';
import { outputCssVariables, getUnique, checkAttr, selector } from '@eightshift/frontend-libs/scripts';
import manifest from './../manifest.json';
import globalManifest from './../../../manifest.json';

export const ModalEditor = (attributes) => {
	const unique = useMemo(() => getUnique(), []);

	const {
		componentClass,
	} = manifest;

	const {
		selectorClass = componentClass,
		additionalClass,
		blockClass,
	} = attributes;

	const modalUse = checkAttr('modalUse', attributes, manifest);

	if (!modalUse) {
		return null;
	}

	const modalClass = classnames([
		selector(componentClass, componentClass),
		selector(blockClass, blockClass, selectorClass),
		selector(additionalClass, additionalClass),
	]);

	return (
		<>
			<div className={modalClass} data-id={unique}>
				{outputCssVariables(attributes, manifest, unique, globalManifest)}
			</div>
		</>
	);
};
