import React from 'react';
import { props } from '@eightshift/frontend-libs/scripts/editor';
import { ImageToolbar } from '../../image/components/image-toolbar';
import { HeadingToolbar } from '../../heading/components/heading-toolbar';
import { ParagraphToolbar } from '../../paragraph/components/paragraph-toolbar';
import { ButtonToolbar } from '../../button/components/button-toolbar';

export const CardToolbar = (attributes) => {
	const {
		setAttributes,
		options,
	} = attributes;

	return (
		<>

			<ImageToolbar
				{...props(attributes, 'image')}
				setAttributes={setAttributes}
			/>

			<HeadingToolbar
				{...props(attributes, 'heading', 'intro')}
				setAttributes={setAttributes}
				options={options}
			/>

			<HeadingToolbar
				{...props(attributes, 'heading')}
				setAttributes={setAttributes}
				options={options}
			/>

			<ParagraphToolbar
				{...props(attributes, 'paragraph')}
				setAttributes={setAttributes}
				options={options}
			/>

			<ButtonToolbar
				{...props(attributes, 'button')}
				setAttributes={setAttributes}
				options={options}
			/>
		</>
	);
};
