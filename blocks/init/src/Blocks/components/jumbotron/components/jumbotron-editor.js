import React, { useMemo } from 'react';
import classnames from 'classnames';
import { outputCssVariables, getUnique, props, checkAttr, selector } from '@eightshift/frontend-libs/scripts';
import { ImageEditor } from '../../image/components/image-editor';
import { HeadingEditor } from '../../heading/components/heading-editor';
import { ParagraphEditor } from '../../paragraph/components/paragraph-editor';
import { ButtonEditor } from '../../button/components/button-editor';
import manifest from './../manifest.json';
import globalManifest from './../../../manifest.json';

export const JumbotronEditor = (attributes) => {
	const unique = useMemo(() => getUnique(), []);
	const {
		componentClass,
	} = manifest;

	const {
		selectorClass = componentClass,
		blockClass,
		additionalClass,
	} = attributes;

	const jumbotronUse = checkAttr('jumbotronUse', attributes, manifest);

	const jumbotronClass = classnames([
		selector(componentClass, componentClass),
		selector(blockClass, blockClass, selectorClass),
		selector(additionalClass, additionalClass),
	]);

	const contentClass = classnames([
		selector(componentClass, componentClass, 'content'),
	]);

	const contentWrapClass = classnames([
		selector(componentClass, componentClass, 'content-wrap'),
	]);

	if (!jumbotronUse) {
		return null;
	}

	return (
		<div className={jumbotronClass} data-id={unique}>
			{outputCssVariables(attributes, manifest, unique, globalManifest)}

			<ImageEditor
				{...props('image', attributes, {
					blockClass: componentClass,
				})}
			/>

			<div className={contentClass}>
				<div className={contentWrapClass}>
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
			</div>
		</div>
	);
};
