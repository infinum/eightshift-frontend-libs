import React, { useMemo } from 'react';
import classnames from 'classnames';
import { outputCssVariables, getUnique, props } from '@eightshift/frontend-libs/scripts/editor';
import { selector } from '@eightshift/frontend-libs/scripts/helpers';
import { ImageEditor } from '../../image/components/image-editor';
import { HeadingEditor } from '../../heading/components/heading-editor';
import { ParagraphEditor } from '../../paragraph/components/paragraph-editor';
import { ButtonEditor } from '../../button/components/button-editor';
import manifest from './../manifest.json';
import globalManifest from './../../../manifest.json';

export const CardEditor = (attributes) => {
	const unique = useMemo(() => getUnique(), []);

	const {
		componentClass: manifestComponentClass,
	} = manifest;

	const {
		setAttributes,
		componentClass = manifestComponentClass,
		selectorClass = componentClass,
		blockClass,
	} = attributes;

	const cardClass = classnames([
		componentClass,
		selector(blockClass, blockClass, selectorClass),
	]);

	return (
		<div className={cardClass} data-id={unique}>

			{outputCssVariables(attributes, manifest, unique, globalManifest)}

			<ImageEditor
				{...props('image', attributes)}
				setAttributes={setAttributes}
				blockClass={componentClass}
			/>

			<HeadingEditor
				{...props('intro', attributes)}
				setAttributes={setAttributes}
				selectorClass={'intro'}
				blockClass={componentClass}
			/>

			<HeadingEditor
				{...props('heading', attributes)}
				setAttributes={setAttributes}
				blockClass={componentClass}
			/>

			<ParagraphEditor
				{...props('paragraph', attributes)}
				setAttributes={setAttributes}
				blockClass={componentClass}
			/>

			<ButtonEditor
				{...props('button', attributes)}
				setAttributes={setAttributes}
				blockClass={componentClass}
			/>

		</div>
	);
};
