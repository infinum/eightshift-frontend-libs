import React from 'react';
import { Fragment } from '@wordpress/element';
import { ImageOptions } from '../../image/components/image-options';
import { HeadingOptions } from '../../heading/components/heading-options';
import { ParagraphOptions } from '../../paragraph/components/paragraph-options';
import { ButtonOptions } from '../../button/components/button-options';

export const CardOptions = (attributes) => {
	const {
		setAttributes,
	} = attributes;

	return (
		<Fragment>

			<ImageOptions
				{...attributes}
				setAttributes={setAttributes}
			/>

			<hr />

			<HeadingOptions
				{...attributes}
				componentName={'intro'}
				label={'Intro'}
				headingColor={attributes.introColor}
				headingSize={attributes.introSize}
				setAttributes={setAttributes}
			/>

			<hr />

			<HeadingOptions
				{...attributes}
				setAttributes={setAttributes}
			/>


			<hr />

			<ParagraphOptions
				{...attributes}
				setAttributes={setAttributes}
			/>

			<hr />

			<ButtonOptions
				{...attributes}
				setAttributes={setAttributes}
			/>

		</Fragment>
	);
};
