import React from 'react';
import { __ } from '@wordpress/i18n';
import { props, getOptions, OptionSelector, checkAttr, getOption, getAttrKey } from '@eightshift/frontend-libs/scripts';
import { ImageOptions } from '../../image/components/image-options';
import { HeadingOptions } from '../../heading/components/heading-options';
import { ParagraphOptions } from '../../paragraph/components/paragraph-options';
import { ButtonOptions } from '../../button/components/button-options';
import manifest from './../manifest.json';

export const CardOptions = (attributes) => {
	const {
		setAttributes,
	} = attributes;

	const cardAlign = checkAttr('cardAlign', attributes, manifest);

	return (
		<>
			<OptionSelector
				value={cardAlign}
				options={getOption('cardAlign', attributes, manifest)}
				onChange={(value) => setAttributes({ [getAttrKey('cardAlign', attributes, manifest)]: value })}
				iconOnly
			/>

			<ImageOptions
				{...props('image', attributes)}
				showImageUse
				showLabel
				reducedBottomSpacing
			/>

			<HeadingOptions
				{...props('intro', attributes, { options: getOptions(attributes, manifest) })}
				label={__('Intro', 'eightshift-frontend-libs')}
				reducedBottomSpacing
			/>

			<HeadingOptions
				{...props('heading', attributes, { options: getOptions(attributes, manifest) })}
				reducedBottomSpacing
			/>

			<ParagraphOptions
				{...props('paragraph', attributes, { options: getOptions(attributes, manifest) })}
				reducedBottomSpacing
			/>

			<ButtonOptions
				{...props('button', attributes, { options: getOptions(attributes, manifest) })} noBottomSpacing
			/>
		</>
	);
};
