import React, { useMemo } from 'react';
import { outputCssVariables, getUnique, props, selector } from '@eightshift/frontend-libs/scripts';
import { clsx } from '@eightshift/ui-components/utilities';
import { ButtonEditor } from '../../../components/button/components/button-editor';
import manifest from './../manifest.json';

export const LoadMoreEditor = (attributes) => {
	const unique = useMemo(() => getUnique(), []);

	const {
		componentClass,
	} = manifest;

	const {
		setAttributes,
		selectorClass = componentClass,
		additionalClass,
		blockClass,
	} = attributes;

	const loadMoreClass = clsx(
		selector(componentClass, componentClass),
		selector(blockClass, blockClass, selectorClass),
		selector(additionalClass, additionalClass),
	);

	return (
		<div className={loadMoreClass} data-id={unique}>
			{outputCssVariables(attributes, manifest, unique)}

			<ButtonEditor
				{...props('button', attributes, {
					setAttributes,
				})}
			/>
		</div>
	);
};
