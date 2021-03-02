import React from 'react';
import { Fragment } from '@wordpress/element';
import { ImageToolbar } from '../../image/components/image-toolbar';
import { HeadingToolbar } from '../../heading/components/heading-toolbar';
import { ParagraphToolbar } from '../../paragraph/components/paragraph-toolbar';
import { ButtonToolbar } from '../../button/components/button-toolbar';

export const CardToolbar = (attributes) => {
	const {
		setAttributes,
		options,
		introAlign,
		introLevel,
	} = attributes;

	return (
		<Fragment>

			<ImageToolbar
				{...attributes}
				setAttributes={setAttributes}
			/>

			<HeadingToolbar
				{...attributes}
				componentName={'intro'}
				headingAlign={introAlign}
				headingLevel={introLevel}
				setAttributes={setAttributes}
				options={options}
			/>

			<HeadingToolbar
				{...attributes}
				setAttributes={setAttributes}
				options={options}
			/>

			<ParagraphToolbar
				{...attributes}
				setAttributes={setAttributes}
				options={options}
			/>

			<ButtonToolbar
				{...attributes}
				setAttributes={setAttributes}
				options={options}
			/>
		</Fragment>
	);
};
