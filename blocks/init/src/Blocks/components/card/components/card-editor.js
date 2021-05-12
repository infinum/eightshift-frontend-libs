import React from 'react';
import classnames from 'classnames';
import { props } from '@eightshift/frontend-libs/scripts/editor';
import { selector } from '@eightshift/frontend-libs/scripts/helpers';
import { ImageEditor } from '../../image/components/image-editor';
import { HeadingEditor } from '../../heading/components/heading-editor';
import { ParagraphEditor } from '../../paragraph/components/paragraph-editor';
import { ButtonEditor } from '../../button/components/button-editor';
import manifest from './../manifest.json';

export const CardEditor = (attributes) => {
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
		<div className={cardClass}>

			<ImageEditor
				{...props(attributes, 'image')}
				setAttributes={setAttributes}
				blockClass={componentClass}
			/>

			<HeadingEditor
				{...props(attributes, 'heading', 'intro')}
				setAttributes={setAttributes}
				selectorClass={'intro'}
				blockClass={componentClass}
			/>

			<HeadingEditor
				{...props(attributes, 'heading')}
				setAttributes={setAttributes}
				blockClass={componentClass}
			/>

			<ParagraphEditor
				{...props(attributes, 'paragraph')}
				setAttributes={setAttributes}
				blockClass={componentClass}
			/>

			<ButtonEditor
				{...props(attributes, 'button')}
				setAttributes={setAttributes}
				blockClass={componentClass}
			/>

		</div>
	);
};
