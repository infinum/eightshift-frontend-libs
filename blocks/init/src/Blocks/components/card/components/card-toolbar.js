import React from 'react'; // eslint-disable-line no-unused-vars
import { Fragment } from '@wordpress/element';
import { ImageToolbar } from '../../../components/image/components/image-toolbar';
import { HeadingToolbar } from '../../../components/heading/components/heading-toolbar';
import { ParagraphToolbar } from '../../../components/paragraph/components/paragraph-toolbar';
import { ButtonToolbar } from '../../../components/button/components/button-toolbar';

export const CardToolbar = (attributes) => {
	const {
		setAttributes,
	} = attributes;

	// <ImageToolbar
	// 	{...attributes}
	// 	setAttributes={setAttributes}
	// />
	return (
		<Fragment>

			<HeadingToolbar
				{...attributes}
				setAttributes={setAttributes}
			/>

			<ParagraphToolbar
				{...attributes}
				setAttributes={setAttributes}
			/>

			<ButtonToolbar
				{...attributes}
				setAttributes={setAttributes}
			/>
		</Fragment>
	);
};
