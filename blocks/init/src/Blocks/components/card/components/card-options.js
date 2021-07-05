import React from 'react';
import { props, getOptions } from '@eightshift/frontend-libs/scripts/editor';
import { ImageOptions } from '../../image/components/image-options';
import { HeadingOptions } from '../../heading/components/heading-options';
import { ParagraphOptions } from '../../paragraph/components/paragraph-options';
import { ButtonOptions } from '../../button/components/button-options';
import manifest from './../manifest.json';

export const CardOptions = (attributes) => {
	const {
		setAttributes,
	} = attributes;

	return (
		<>

			<ImageOptions
				{...props(attributes, 'image')}
				setAttributes={setAttributes}
			/>

			<hr />

			<HeadingOptions
				{...props(attributes, 'intro')}
				label={'Intro'}
				setAttributes={setAttributes}
				options={getOptions(attributes, manifest)}
			/>

			<hr />

			<HeadingOptions
				{...props(attributes, 'heading')}
				setAttributes={setAttributes}
				options={getOptions(attributes, manifest)}
			/>

			<hr />

			<ParagraphOptions
				{...props(attributes, 'paragraph')}
				setAttributes={setAttributes}
				options={getOptions(attributes, manifest)}
			/>

			<hr />

			<ButtonOptions
				{...props(attributes, 'button')}
				setAttributes={setAttributes}
				options={getOptions(attributes, manifest)}
			/>

		</>
	);
};
