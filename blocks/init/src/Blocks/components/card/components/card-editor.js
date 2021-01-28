import React from 'react';
import classnames from 'classnames';
import { selector } from '@eightshift/frontend-libs/scripts/helpers';
import { ImageEditor } from '../../image/components/image-editor';
import { HeadingEditor } from '../../heading/components/heading-editor';
import { ParagraphEditor } from '../../paragraph/components/paragraph-editor';
import { ButtonEditor } from '../../button/components/button-editor';
import manifest from './../manifest.json';

export const CardEditor = (attributes) => {
	const {
		setAttributes,
		componentClass = manifest.componentClass,
		selectorClass = componentClass,
		blockClass,
		introContent,
		introColor,
		introSize,
		introAlign,
	} = attributes;

	const cardClass = classnames([
		componentClass,
		selector(blockClass, blockClass, selectorClass),
	]);

	return (
		<div className={cardClass}>

			<ImageEditor
				{...attributes}
				setAttributes={setAttributes}
				blockClass={componentClass}
			/>

			<HeadingEditor
				{...attributes}
				componentName={'intro'}
				headingContent={introContent}
				headingColor={introColor}
				headingSize={introSize}
				headingAlign={introAlign}
				setAttributes={setAttributes}
				selectorClass={'intro'}
				blockClass={componentClass}
			/>

			<HeadingEditor
				{...attributes}
				setAttributes={setAttributes}
				blockClass={componentClass}
			/>


			<ParagraphEditor
				{...attributes}
				setAttributes={setAttributes}
				blockClass={componentClass}
			/>
			<ButtonEditor
				{...attributes}
				setAttributes={setAttributes}
				blockClass={componentClass}
			/>

		</div>
	);
};
