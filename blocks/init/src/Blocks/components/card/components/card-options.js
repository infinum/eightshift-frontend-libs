import React from 'react';
import { __ } from '@wordpress/i18n';
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
				showImageUse
				showLabel
			/>

			<HeadingOptions
				{...props('intro', attributes, {
					options: getOptions(attributes, manifest),
				})}
				label={__('Intro', 'eightshift-boilerplate')}
				showHeadingUse
				showLabel
			/>

			<HeadingOptions
				{...props('heading', attributes, {
					options: getOptions(attributes, manifest),
				})}
				showHeadingUse
				showLabel
			/>

			<ParagraphOptions
				{...props('paragraph', attributes, {
					options: getOptions(attributes, manifest),
				})}
				showParagraphUse
				showLabel
			/>

			<ButtonOptions
				{...props('button', attributes, {
					options: getOptions(attributes, manifest),
				})}
				showButtonUse
				showLabel
			/>
		</>
	);
};
