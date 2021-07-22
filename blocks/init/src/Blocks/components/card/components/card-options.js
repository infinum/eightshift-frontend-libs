import React from 'react';
import { props, getOptions } from '@eightshift/frontend-libs/scripts';
import { ImageOptions } from '../../image/components/image-options';
import { HeadingOptions } from '../../heading/components/heading-options';
import { ParagraphOptions } from '../../paragraph/components/paragraph-options';
import { ButtonOptions } from '../../button/components/button-options';
import manifest from './../manifest.json';

export const CardOptions = (attributes) => {
	return (
		<>

			<ImageOptions
				{...props('image', attributes)}
			/>

			<hr />

			<HeadingOptions
				{...props('intro', attributes, {
					options: getOptions(attributes, manifest),
				})}
				label={'Intro'}
			/>

			<hr />

			<HeadingOptions
				{...props('heading', attributes, {
					options: getOptions(attributes, manifest),
				})}
			/>

			<hr />

			<ParagraphOptions
				{...props('paragraph', attributes, {
					options: getOptions(attributes, manifest),
				})}
			/>

			<hr />

			<ButtonOptions
				{...props('button', attributes, {
					options: getOptions(attributes, manifest),
				})}
			/>

		</>
	);
};
