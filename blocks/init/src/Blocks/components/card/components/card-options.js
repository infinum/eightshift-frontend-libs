import React from 'react';
import { props } from '@eightshift/frontend-libs/scripts/editor';
import { ImageOptions } from '../../image/components/image-options';
import { HeadingOptions } from '../../heading/components/heading-options';
import { ParagraphOptions } from '../../paragraph/components/paragraph-options';
import { ButtonOptions } from '../../button/components/button-options';

export const CardOptions = (attributes) => {
	const {
		setAttributes,
		options,
	} = attributes;

	return (
		<>

			<ImageOptions
				{...props(attributes, 'image')}
				setAttributes={setAttributes}
			/>

			<hr />

			<HeadingOptions
				{...props(attributes, 'heading', 'intro')}
				label={'Intro'}
				setAttributes={setAttributes}
				options={options}
			/>

			<hr />

			<HeadingOptions
				{...props(attributes, 'heading')}
				setAttributes={setAttributes}
				options={options}
			/>

			<hr />

			<ParagraphOptions
				{...props(attributes, 'paragraph')}
				setAttributes={setAttributes}
				options={options}
			/>

			<hr />

			<ButtonOptions
				{...props(attributes, 'button')}
				setAttributes={setAttributes}
				options={options}
			/>

		</>
	);
};
