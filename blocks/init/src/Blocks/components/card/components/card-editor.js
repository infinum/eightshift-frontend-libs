import React, { useMemo } from 'react';
import classnames from 'classnames';
import { outputCssVariables, getUnique, props, selector } from '@eightshift/frontend-libs/scripts';
import { ImageEditor } from '../../image/components/image-editor';
import { HeadingEditor } from '../../heading/components/heading-editor';
import { ParagraphEditor } from '../../paragraph/components/paragraph-editor';
import { ButtonEditor } from '../../button/components/button-editor';
import manifest from './../manifest.json';
import globalManifest from './../../../manifest.json';

export const CardEditor = (attributes) => {
	const unique = useMemo(() => getUnique(), []);

	const {
		componentClass,
	} = manifest;

	const {
		selectorClass = componentClass,
		blockClass,
		additionalClass,
	} = attributes;

	const cardClass = classnames([
		selector(componentClass, componentClass),
		selector(blockClass, blockClass, selectorClass),
		selector(additionalClass, additionalClass),
	]);

	return (
		<div className={cardClass} data-id={unique}>
			{outputCssVariables(attributes, manifest, unique, globalManifest)}

			<ImageEditor
				{...props('image', attributes, {
					blockClass: componentClass,
				})}
			/>

			<HeadingEditor
				{...props('intro', attributes, {
					selectorClass: 'intro',
					blockClass: componentClass,
				})}
			/>

			<HeadingEditor
				{...props('heading', attributes, {
					blockClass: componentClass,
				})}
			/>

			<ParagraphEditor
				{...props('paragraph', attributes, {
					blockClass: componentClass,
				})}
			/>

			<ButtonEditor
				{...props('button', attributes, {
					blockClass: componentClass,
				})}
			/>
		</div>
	);
};
